import { ObjectSchema } from '@hapi/joi';
import { PipeTransform, Injectable, BadGatewayException } from '@nestjs/common';

@Injectable()
export class JoiValidatePipe implements PipeTransform {

    constructor(private schema: ObjectSchema) { }

    transform(value: Record<string, any>) {
        const {error}  = this.schema.validate(value);
        if (error) {
            throw new BadGatewayException({
                error : "Validation error",
                message : error.message.replace(/(\"|\[\d\])/g, "")
            })
        }
        return value;
    }
}
 