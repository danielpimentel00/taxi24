import { InternalServerErrorException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { ConductorService } from "../../src/application/services/conductor.service";
import { ConductorModel } from "../../src/domain/models/conductor.model";
import { ConductoresController } from "../../src/api/controllers/conductores.controller";
import { ServicesProxyModule } from "../../src/infrastructure/services-proxy/services-proxy.module";
import { ConductorRepository } from "../../src/infrastructure/repositories/conductor.repository";

const mockedDrivers = [
  {
    id: 1,
    fullname: "Driver 1",
    isAvailable: false,
    latitude: -90.56231,
    longitude: 60.6321462,
  },
  {
    id: 2,
    fullname: "Driver 2",
    isAvailable: true,
    latitude: -75.56231,
    longitude: 80.874124,
  },
];

describe("ConductoresController", () => {
  let conductoresController: ConductoresController;
  let conductorService: ConductorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConductoresController],
      providers: [
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

    conductoresController = module.get<ConductoresController>(
      ConductoresController,
    );
    conductorService = module.get<ConductorService>(
      ServicesProxyModule.CONDUCTOR_SERVICE,
    );
  });

  describe("getAll", () => {
    it("should return an array of drivers", async () => {
      jest
        .spyOn(conductorService, "getAllDrivers")
        .mockResolvedValue(mockedDrivers);

      const result = await conductoresController.getAll();

      expect(result).toEqual(mockedDrivers);
    });

    it("should throw InternalServerErrorException when an error occurs", async () => {
      jest
        .spyOn(conductorService, "getAllDrivers")
        .mockRejectedValue(
          new InternalServerErrorException("Something went wrong"),
        );

      try {
        await conductoresController.getAll();
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });

  describe("getAvailableDrivers", () => {
    it("should return an array of available drivers", async () => {
      const availableDrivers = mockedDrivers.map((x) => ({
        ...x,
        isAvailable: true,
      }));
      jest
        .spyOn(conductorService, "getAvailableDrivers")
        .mockResolvedValue(availableDrivers);

      const result = await conductoresController.getAvailableDrivers();

      expect(result).toEqual(availableDrivers);
    });

    it("should throw InternalServerErrorException when an error occurs", async () => {
      jest
        .spyOn(conductorService, "getAvailableDrivers")
        .mockRejectedValue(
          new InternalServerErrorException("Something went wrong"),
        );

      try {
        await conductoresController.getAvailableDrivers();
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });

  describe("getDriversWithin3Km", () => {
    it("should return an array of drivers within 3 km", async () => {
      const latitude = 40.0;
      const longitude = -75.0;
      jest
        .spyOn(conductorService, "getClosestDrivers")
        .mockResolvedValue(mockedDrivers);

      const result = await conductoresController.getDriversWithin3Km(
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
        await conductoresController.getDriversWithin3Km(40.0, -75.0);
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });

  describe("getById", () => {
    it("should return a driver by ID", async () => {
      const driverId = 1;
      jest
        .spyOn(conductorService, "getDriverById")
        .mockResolvedValue(mockedDrivers[0]);

      const result = await conductoresController.getById(driverId);

      expect(result).toEqual(mockedDrivers[0]);
    });

    it("should throw InternalServerErrorException when an error occurs", async () => {
      jest
        .spyOn(conductorService, "getDriverById")
        .mockRejectedValue(
          new InternalServerErrorException("Something went wrong"),
        );

      try {
        await conductoresController.getById(1);
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });
});
