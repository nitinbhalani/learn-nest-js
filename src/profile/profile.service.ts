import { Injectable } from '@nestjs/common';
import { Profile } from './profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}
  public async getAllProfiles() {
    return await this.profileRepository.find({ relations: ['user'] });
  }
  public async deleteUser(id: number) {
    await this.profileRepository.delete(id);

    return { deleted: true };
  }
}
