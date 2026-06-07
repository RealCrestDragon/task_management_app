// import {
//   ExceptionFilter,
//   Catch,
//   ArgumentsHost,
//   HttpException,
//   HttpStatus,
// } from '@nestjs/common';
// import { IResponse } from 'src/interfaces/response.interface';

// const getErrorMessage = ({
//   exceptionRes,
//   message,
// }: {
//   exceptionRes: { errorCode?: string; message: any };
//   message: string;
// }): string => {
//   let errorMessage = message;
//   if (exceptionRes) {
//     if (exceptionRes.message) {
//       if (Array.isArray(exceptionRes.message)) {
//         errorMessage = exceptionRes?.message[0];
//       } else {
//         errorMessage = exceptionRes?.message;
//       }
//     }
//   }
//   return errorMessage;
// };
// @Catch(HttpException)
// export class HttpExceptionFilter implements ExceptionFilter {
//   catch(exception: HttpException, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<IResponse>();
//     const message = exception.message;
//     const status = exception.getStatus();
//     const exceptionRes = exception.getResponse() as {
//       errorCode: string;
//       code?: string;
//       message: string | string[];
//     };

//     console.log('Log Error:', exceptionRes);

//     return response.error(
//       getErrorMessage({ exceptionRes, message }),
//       exceptionRes.errorCode || exceptionRes.code,
//       status || HttpStatus.BAD_REQUEST,
//     );
//   }
// }
