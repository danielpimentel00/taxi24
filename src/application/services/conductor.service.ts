import { Injectable } from "@nestjs/common";
import { ConductorDto } from "src/domain/DTO/conductor.dto";
import { ConductorModel } from "src/domain/models/conductor.model";
import { IConductorRepository } from "src/domain/repositories/conductor-repository.interface";

@Injectable()
export class ConductorService {
  constructor(private readonly conductorRepository: IConductorRepository) {}

  async getAllDrivers(): Promise<ConductorModel[]> {
    return await this.conductorRepository.findAll();
  }

  async getDriverById(id: number): Promise<ConductorModel> {
    return await this.conductorRepository.findById(id);
  }

  async getAvailableDrivers(): Promise<ConductorModel[]> {
    return await this.conductorRepository.findAvailableDrivers();
  }

  async getDriversWithin3Km(
    latitude: number,
    longitude: number,
  ): Promise<ConductorDto[]> {
    const drivers = await this.conductorRepository.findAll();

    const driversWithin3Km = drivers
      .map((driver) => {
        const distance = this.calculateDistance(
          latitude,
          longitude,
          driver.latitude,
          driver.longitude,
        );
        return this.toConductorDto(driver, parseFloat(distance.toFixed(2)));
      })
      .filter((driver) => driver.distance <= 3);

    return driversWithin3Km;
  }

  private calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const earthRadiusKm = 6371;

    const dLat = this.degreesToRadians(lat2 - lat1);
    const dLon = this.degreesToRadians(lon2 - lon1);

    lat1 = this.degreesToRadians(lat1);
    lat2 = this.degreesToRadians(lat2);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadiusKm * c;
  }

  private degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  private toConductorDto(
    conductorModel: ConductorModel,
    distance: number,
  ): ConductorDto {
    const conductorDto = new ConductorDto();

    conductorDto.id = conductorModel.id;
    conductorDto.fullname = conductorModel.fullname;
    conductorDto.isAvailable = conductorModel.isAvailable;
    conductorDto.latitude = conductorModel.latitude;
    conductorDto.longitude = conductorModel.longitude;
    conductorDto.distance = distance;

    return conductorDto;
  }
}
