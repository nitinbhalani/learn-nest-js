import { Controller, Delete, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  public getProfile() {
    return this.profileService.getAllProfiles();
  }

  @Delete(':id')
  public deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.profileService.deleteUser(id);
  }
}
