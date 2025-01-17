import {SelectParams, InsertParams, UpdateParams, DeleteParams} from '@/types/common/models';
import {LoginUser, AuthUser} from '@/features/users/users.type'; 

import {Service} from 'typedi';

import IndexService from '@/services/index';
import UsersModel from '@/features/users/users.model';

import {encryptPW} from '@/utils/crypto';
import {sign, refresh, verify} from '@/utils/jwt';

@Service()
class UsersService extends IndexService {
    constructor(private readonly usersModel: UsersModel) {
      super();
    }

    async getUserById(params: SelectParams) {
      const {whereFields} = params;
      const result = await this.usersModel.selectUsers({
        selectFields: ['id', 'name', 'created_at'],
        whereFields,
      });
      return this.sendToResult(result, true);
    }

    async loginUser(params: LoginUser) {
      const {identifier, password, deviceId} = params;

      let user = await this.usersModel.selectUsers({
        selectFields: ['id', 'salt'],
        whereFields: {
          identifier
        }
      });

      if (!user || user.length < 1) {
        return this.sendToResult({
          errCode: 'ER0001',
        });
      }

      const encryptPassword = encryptPW(password, user[0].salt);
      user = await this.usersModel.selectUsers({
        selectFields: ['id'],
        whereFields: {
          identifier,
          password: encryptPassword
        }
      });

      if (!user || user.length < 1) {
        return this.sendToResult({
          errCode: 'ER0002',
        });
      }

      const accessToken = sign({id: user[0].id});
      const refreshToken = refresh({id: user[0].id});

      if (!refreshToken && !accessToken) {
        return this.sendToResult({
          errCode: 'ER0004',
        });
      }

      const isValidRefreshToken = await this.usersModel.insertRefreshToken({
        insertFields: {
          userId: user[0].id,
          refreshToken,
          deviceId,
        }
      });

      if (!isValidRefreshToken) {
        return this.sendToResult({
          errCode: 'ER0004',
        });
      }

      return this.sendToResult({
        accessToken,
        refreshToken
      }, true);
    }

    async logoutUser(params: AuthUser) {
      const {id, deviceId} = params;

      const isValidRefreshToken = await this.usersModel.updateRefreshToken({
        updateFields: {
          isValid: false,
        },
        whereFields: {
          userId: id,
          deviceId,
        },
      });

      if (!isValidRefreshToken) {
        return this.sendToResult({
          errCode: 'ER0004',
        });
      }

      return this.sendToResult(true, true, 'select', 'logout success');

    }

    async refreshUser(params: AuthUser) {
      const {id, deviceId} = params;

      const refreshToken = await this.usersModel.selectRefreshToken({
        selectFields: ['id', 'refreshToken'],
        whereFields: {
          userId: id,
          deviceId,
          isValid: true,
        }
      });

      if (!refreshToken || refreshToken.length < 1) {
        return this.sendToResult({
          errCode: 'ER0004',
        });
      }

      const isRefreshValid = verify(refreshToken[0].refreshToken);

      if (!isRefreshValid.ok) {
        return this.sendToResult({
          errCode: 'ER0004',
        });
      }

      const accessToken = sign({id});
      return this.sendToResult({
        accessToken,
      }, true);
    }
}

export default UsersService;
