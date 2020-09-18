import { NestInterceptor, Injectable, ExecutionContext, CallHandler} from "@nestjs/common"
import { Observable } from "rxjs"
import { tap } from "rxjs/operators"


/*
This  interceptor is used for the logging purpose only .
And it is for the controller specific only  
*/

@Injectable()
export class LoggingInterceptor implements NestInterceptor { 
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> { 
        console.log("Before...");

        const now = Date.now();
        return next
            .handle()
            .pipe(
                tap(() => console.log("After.....", Date.now() - now))
                //.pipe(map(value => value === null ? '' : value ));  //Todo: to map each value which is null to the empty sttring.
        )
    }
}