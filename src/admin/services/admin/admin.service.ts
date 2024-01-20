import { Injectable } from '@nestjs/common';
import RegisterClientRequestDto  from '../../dto/register-client'

@Injectable()
export class AdminService {

    async createClient(request: RegisterClientRequestDto) {
        // check if clientName already exists in database
        
    }
}
