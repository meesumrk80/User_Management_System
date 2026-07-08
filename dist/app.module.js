"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_controller_1 = require("./user/user.controller");
const user_module_1 = require("./user/user.module");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const user_service_1 = require("./user/user.service");
const user_entity_1 = require("./user/user.entity");
const file_service_1 = require("./file/file.service");
const file_controller_1 = require("./file/file.controller");
const file_entity_1 = require("./file/file.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [user_module_1.UserModule, config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                port: 5432,
                host: 'localhost',
                database: process.env.DATABASE_NAME,
                password: process.env.DATABASE_PASSWORD,
                username: process.env.DATABASE_USERNAME,
                autoLoadEntities: true,
                synchronize: true
            }), typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, file_entity_1.File])
        ],
        controllers: [app_controller_1.AppController, user_controller_1.UserController, file_controller_1.FileController],
        providers: [app_service_1.AppService, user_service_1.UserService, file_service_1.FileService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map