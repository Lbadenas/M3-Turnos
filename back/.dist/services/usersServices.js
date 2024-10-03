"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckExistingUserService = exports.findUserCredentialId = exports.CreateUserService = exports.getUserByIdServices = exports.getAllUsersServices = void 0;
const credentialsServices_1 = require("./credentialsServices");
const repositories_1 = require("../repositories");
const getAllUsersServices = () => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield repositories_1.userModel.find({
        relations: { appointments: true },
    });
    return allUsers;
});
exports.getAllUsersServices = getAllUsersServices;
const getUserByIdServices = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield repositories_1.userModel.findOne({
        where: { id },
        relations: { appointments: true },
    });
    if (!user)
        throw new Error("usuario no encontrado");
    return user;
});
exports.getUserByIdServices = getUserByIdServices;
const CreateUserService = (createUserDto) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = repositories_1.userModel.create(createUserDto);
    yield repositories_1.userModel.save(newUser);
    const newCredential = yield (0, credentialsServices_1.createCredential)({
        username: createUserDto.username,
        password: createUserDto.password,
    });
    newUser.credential = newCredential;
    yield repositories_1.userModel.save(newUser);
    return newUser;
});
exports.CreateUserService = CreateUserService;
const findUserCredentialId = (credentialId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield repositories_1.userModel.findOneBy({
        credential: { id: credentialId },
    });
    if (!user)
        throw new Error("Usuario no encontrado");
    return user;
});
exports.findUserCredentialId = findUserCredentialId;
const CheckExistingUserService = (username, email) => __awaiter(void 0, void 0, void 0, function* () {
    const existingEmail = yield repositories_1.userModel.findOne({
        where: { email },
    });
    const existingUsername = yield repositories_1.credentialModel.findOne({
        where: { username },
    });
    if (existingEmail || existingUsername)
        return true;
    else
        return false;
});
exports.CheckExistingUserService = CheckExistingUserService;
