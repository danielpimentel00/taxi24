import { Test, TestingModule } from "@nestjs/testing";
import { PasajerosController } from "../../src/api/controllers/pasajeros.controller";
import { PasajeroService } from "../../src/application/services/pasajero.service";
import { PasajeroRepository } from "../../src/infrastructure/repositories/pasajero.repository";
import { ServicesProxyModule } from "../../src/infrastructure/services-proxy/services-proxy.module";
import { ConductorRepository } from "../../src/infrastructure/repositories/conductor.repository";
import { ConductorService } from "../../src/application/services/conductor.service";
import { PasajeroModel } from "../../src/domain/models/pasajero.model";
import { InternalServerErrorException } from "@nestjs/common";

const mockedPassengers: PasajeroModel[] = [
  { id: 1, fullname: "Pedro" },
  { id: 2, fullname: "Juana" },
];

const mockedDrivers = [
  {
    id: 1,
    fullname: "Driver 1",
    isAvailable: false,
    latitude: -90.56231,
    longitude: 60.6321462,
    distance: 2.3,
  },
  {
    id: 2,
    fullname: "Driver 2",
    isAvailable: true,
    latitude: -75.56231,
    longitude: 80.874124,
    distance: 1.2,
  },
];

describe("PasajerosController", () => {
  let pasajerosController: PasajerosController;
  let pasajeroService: PasajeroService;
  let conductorService: ConductorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PasajerosController],
      providers: [
        {
          provide: PasajeroRepository,
          useValue: {
            findAll: jest.fn(),
            findById: jest.fn(),
          },
        },
        {
          inject: [PasajeroRepository],
          provide: ServicesProxyModule.PASAJERO_SERVICE,
          useFactory: (conductorRepository: PasajeroRepository) =>
            new PasajeroService(conductorRepository),
        },
        {
          provide: ConductorRepository,
          useValue: {
            findAll: jest.fn(),
            findAvailableDrivers: jest.fn(),
            findById: jest.fn(),
          },
        },
        {
          inject: [ConductorRepository],
          provide: ServicesProxyModule.CONDUCTOR_SERVICE,
          useFactory: (conductorRepository: ConductorRepository) =>
            new ConductorService(conductorRepository),
        },
      ],
    }).compile();

    pasajerosController = module.get<PasajerosController>(PasajerosController);
    pasajeroService = module.get<PasajeroService>(
      ServicesProxyModule.PASAJERO_SERVICE,
    );
    conductorService = module.get<ConductorService>(
      ServicesProxyModule.CONDUCTOR_SERVICE,
    );
  });

  describe("getAll", () => {
    it("should return an array of passengers", async () => {
      jest
        .spyOn(pasajeroService, "getAllPassengers")
        .mockResolvedValue(mockedPassengers);

      const result = await pasajerosController.getAll();

      expect(result).toEqual(mockedPassengers);
    });

    it("should throw InternalServerErrorException when an error occurs", async () => {
      jest
        .spyOn(pasajeroService, "getAllPassengers")
        .mockRejectedValue(
          new InternalServerErrorException("Something went wrong"),
        );

      try {
        await pasajerosController.getAll();
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });

  describe("getClosestDrivers", () => {
    const latitude = 40.651258;
    const longitude = -75.9851525;

    it("should return an array of closest drivers", async () => {
      jest
        .spyOn(conductorService, "getClosestDrivers")
        .mockResolvedValue(mockedDrivers);

      const result = await pasajerosController.getClosestDrivers(
        latitude,
        longitude,
      );

      expect(result).toEqual(mockedDrivers);
    });

    it("should throw InternalServerErrorException when an error occurs", async () => {
      jest
        .spyOn(conductorService, "getClosestDrivers")
        .mockRejectedValue(
          new InternalServerErrorException("Something went wrong"),
        );

      try {
        await pasajerosController.getClosestDrivers(latitude, longitude);
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });

  describe("getById", () => {
    it("should return a passenger by ID", async () => {
      const passengerId = 1;
      jest
        .spyOn(pasajeroService, "getPassengerById")
        .mockResolvedValue(mockedPassengers[0]);

      const result = await pasajerosController.getById(passengerId);

      expect(result).toEqual(mockedPassengers[0]);
    });

    it("should throw InternalServerErrorException when an error occurs", async () => {
      jest
        .spyOn(pasajeroService, "getPassengerById")
        .mockRejectedValue(
          new InternalServerErrorException("Something went wrong"),
        );

      try {
        await pasajerosController.getById(1);
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });
});
