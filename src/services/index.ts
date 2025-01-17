import knex from '@/utils/knex';

type dataObject = {
    [anyKeyword: string]: any;
};

// MySQL 에러코드 매핑
const errorMapping: { [key: number]: any } = {
  1054: { code: 'ER1054', message: '알 수 없는 열이 존재합니다' },
  1062: { code: 'ER1062', message: '중복된 데이터가 존재합니다' },
  1048: { code: 'ER1048', message: '필수 입력값이 없습니다' },
  1452: { code: 'ER1452', message: '참조하려는 외래키 데이터가 없습니다' },
  1146: { code: 'ER1146', message: '존재하지 않는 테이블입니다' },
  1525: { code: 'ER1525', message: '열의 데이터 타입이 일치하지 않습니다' },
  1064: { code: 'ER1064', message: 'SQL 문법 오류' },
  1052: { code: 'ER1052', message: '테이블 컬럼 명시 필요' },
}

export default class IndexService {

    sendToResult(
      result: any,
      showResult: boolean = false,
      type: string = 'select',
      successMessage: string = 'success', 
    ) {

      if (result.errno) {
        return errorMapping[result.errno] || { success: false, code: 'ER0000', message: '알 수 없는 오류', result };
      }

      if (result.errCode) {
        return { success: false, code: result.errCode};
      }
      
      if (result === 0) {
        let code;

        switch (type) {
          case 'insert':
            code = 'ER0005';
            break;
          case 'update':
            code = 'ER0006';
            break;
          case 'delete':
            code = 'ER0007';
            break;
          default:
            code = 'ER0000';
        }

        return { success: false, code };
      }

      return {
        success: true,
        message: successMessage,
        result: showResult ? result : [],
      }
    }

}
