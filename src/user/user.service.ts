import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilterUser } from './entities/filter-user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const userExists = await this.prismaService.user.findUnique({
        where: {
          email: createUserDto.email,
        },
      });

      if (userExists) {
        throw new BadRequestException(
          'Email pertence a um usuário já cadastrado',
        );
      }

      const validaCpf = await this.prismaService.user.findUnique({
        where: { cpf: createUserDto.cpf },
      });
      if (validaCpf) {
        throw new BadRequestException(
          'CPF pertence a um usuário já cadastrado',
        );
      }

      createUserDto.password = await bcrypt.hashSync(
        createUserDto.password,
        +process.env.SALTROUNDSPASSWORD,
      );

      const user = await this.prismaService.user.create({
        data: createUserDto,
      });
      const { password, ...result } = user;
      return result;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(params: FilterUser): Promise<User[]> {
    try {
      const users = await this.prismaService.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          cpf: true,
          birthdate: true,
          createdAt: true,
          updatedAt: true,
        },
        take: params.take,
        skip: params.skip,
      });

      return users;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.prismaService.user.findUnique({
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          cpf: true,
          birthdate: true,
          createdAt: true,
          updatedAt: true,
        },
        where: {
          id: id,
        },
      });
      return user;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const userExists = await this.prismaService.user.findUnique({
        where: {
          id: id,
        },
      });

      if (!userExists) {
        throw new BadRequestException('Usuário não encontrado!');
      }

      const cpfExists = await this.prismaService.user.findUnique({
        where: {
          cpf: updateUserDto.cpf,
        },
      });

      if (cpfExists && cpfExists?.id !== id) {
        throw new BadRequestException(
          'CPF já esta sendo usado em outro usuário!',
        );
      }
      updateUserDto.password = await bcrypt.hashSync(
        updateUserDto.password,
        +process.env.SALTROUNDSPASSWORD,
      );

      const emailExists = await this.prismaService.user.findUnique({
        where: {
          email: updateUserDto.email,
        },
      });

      if (emailExists && emailExists?.id !== id) {
        throw new BadRequestException(
          'EMAIL já esta sendo usado em outro usuário!',
        );
      }

      const updateUser = await this.prismaService.user.update({
        where: {
          id: id,
        },
        data: updateUserDto,
      });

      return updateUser;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string) {
    try {
      const userExists = await this.prismaService.user.findUnique({
        where: {
          id: id,
        },
      });

      if (!userExists) {
        throw new BadRequestException('Usuário não encontrado!');
      }
      const excludedUser = await this.prismaService.user.delete({
        where: { id: id },
      });

      return excludedUser;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }
}
