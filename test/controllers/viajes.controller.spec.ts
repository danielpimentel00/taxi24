import { Test, TestingModule } from "@nestjs/testing";
import { ViajesController } from "../../src/api/controllers/viajes.controller";
import { ViajeService } from "../../src/application/services/viaje.service";
import { ViajeRepository } from "../../src/infrastructure/repositories/viaje.repository";
import { ServicesProxyModule } from "../../src/infrastructure/services-proxy/services-proxy.module";
import { FacturaRepository } from "../../src/infrastructure/repositories/factura.repository";
import { ViajeModel } from "../../src/domain/models/viaje.model";
import { InternalServerErrorException } from "@nestjs/common";
import { CompleteTripDto } from "../../src/domain/DTO/complete-trip.dto";

const mockedTripRequest: ViajeModel = {
  id: null,
  idConductor: 2,
  idPasajero: 3,
  isActive: false,
  monto: 260.5,
};

const mockedTripResponse: ViajeModel = {
  ...mockedTripRequest,
  id: 1,
};

const mockedCompletedTripDto: CompleteTripDto = {
  viaje: mockedTripResponse,
  factura: {
    id: 2,
    idViaje: 1,
    subTotal: 260.5,
    totalItbis: 46.89,
    total: 307.39,
  },
};

describe("ViajesController", () => {
  let viajesController: ViajesController;
  let viajeService: ViajeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ViajesController],
      providers: [
        {
          provide: ViajeRepository,
          useValue: {
            insert: jest.fn(),
            completeTrip: jest.fn(),
            findActiveTrips: jest.fn(),
          },
        },
        {
          provide: FacturaRepository,
          useValue: {
            createFactura: jest.fn(),
          },
        },
        {
          inject: [ViajeRepository, FacturaRepository],
          provide: ServicesProxyModule.VIAJE_SERVICE,
          useFactory: (
            viajeRepository: ViajeRepository,
            facturaRepository: FacturaRepository,
          ) => new ViajeService(viajeRepository, facturaRepository),
        },
      ],
    }).compile();

    viajesController = module.get<ViajesController>(ViajesController);
    viajeService = module.get<ViajeService>(ServicesProxyModule.VIAJE_SERVICE);
  });

  describe("createTrip", () => {
    it("should create a trip and return the result", async () => {
      jest
        .spyOn(viajeService, "createTrip")
        .mockResolvedValue(mockedTripResponse);

      const result = await viajesController.createTrip(mockedTripRequest);

      expect(result).toEqual(mockedTripResponse);
    });

    it("should throw InternalServerErrorException when an error occurs", async () => {
      jest
        .spyOn(viajeService, "createTrip")
        .mockRejectedValue(
          new InternalServerErrorException("Something went wrong"),
        );

      try {
        await viajesController.createTrip(mockedTripRequest);
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });

  describe("getActiveTrips", () => {
    it("should return an array of active trips", async () => {
      jest
        .spyOn(viajeService, "getActiveTrips")
        .mockResolvedValue([mockedTripResponse]);

      const result = await viajesController.getActiveTrips();

      expect(result).toEqual([mockedTripResponse]);
    });

    it("should throw InternalServerErrorException when an error occurs", async () => {
      jest
        .spyOn(viajeService, "getActiveTrips")
        .mockRejectedValue(
          new InternalServerErrorException("Something went wrong"),
        );

      try {
        await viajesController.getActiveTrips();
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });

  describe("completeTrip", () => {
    it("should complete a trip and return the result", async () => {
      const tripId = 1;
      jest
        .spyOn(viajeService, "completeTrip")
        .mockResolvedValue(mockedCompletedTripDto);

      const result = await viajesController.completeTrip(tripId);

      expect(result).toEqual(mockedCompletedTripDto);
    });

    it("should throw InternalServerErrorException when an error occurs", async () => {
      jest
        .spyOn(viajeService, "completeTrip")
        .mockRejectedValue(
          new InternalServerErrorException("Something went wrong"),
        );

      try {
        await viajesController.completeTrip(1);
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });
});
