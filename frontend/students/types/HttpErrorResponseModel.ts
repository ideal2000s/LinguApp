import { v4 as uuidv4 } from 'uuid';
import LinguError from './Error';
export default class HttpErrorResponseModel implements LinguError {
  public readonly id: string = uuidv4();
  public status = 0;
  public message = '';
  public errors: string[] = [];
  public url = '';
  public raw: any = null;
}
