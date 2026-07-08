import { Controller,Get,Param,Post } from '@nestjs/common';
import { FileService } from './file.service';

@Controller('file')
export class FileController {

    constructor(private readonly file:FileService){}

    //Admin Route
    @Get()
    getAllFile(){

    }

    @Get(':id')
    getuserFiles(@Param('id') id:string){
        
    }
}
