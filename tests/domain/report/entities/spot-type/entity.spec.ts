import {
	ISpotTypeRepository,
	SpotTypeEntityModel,
	SpotTypeDTO,
	SpotTypeEntity,
	SpotTypeDTOWithoutId,
} from "@/domain/report";

describe("SpotTypeEntity", () => {
	let mockRepository: ISpotTypeRepository;
	let spotTypeEntity: SpotTypeEntity;
	const mockEntityModel = SpotTypeEntityModel.create({
		spotTypeId: 1,
		spotTypeName: "Spot Type",
		description: "Spot Description",
		active: true,
		createdBy: 1,
		spotData: {}
	} as SpotTypeDTO) as SpotTypeEntityModel;

	beforeEach(() => {
		mockRepository = {
			create: jest.fn(),
			getById: jest.fn(),
			getAll: jest.fn(),
			update: jest.fn(),
			delete: jest.fn(),
			getSpotTypeByName: jest.fn()
		};

		spotTypeEntity = new SpotTypeEntity(mockRepository);
	});

	describe("create", () => {
		it("should throw an error for an invalid entity model", async () => {
			spotTypeEntity.create({
				spotTypeName: "",
				description: "",
				active: true,
				createdBy: 1,
				spotData: {}
			} as SpotTypeDTOWithoutId).catch(e => expect(e).toBeInstanceOf(Error));
		});

		it("should create spot type", async () => {
			jest.spyOn(mockRepository, "create").mockResolvedValueOnce(mockEntityModel as SpotTypeEntityModel);

			const result = await spotTypeEntity.create({
				spotTypeName: "Spot Type",
				description: "Spot Description",
				active: true,
				createdBy: 1,
				spotData: {}
			} as SpotTypeDTOWithoutId);

			expect(result).toEqual(mockEntityModel);
		});
	});

	describe("getById", () => {
		it("should return spot type by id", async () => {
			jest.spyOn(mockRepository, "getById").mockResolvedValueOnce(mockEntityModel);

			const result = await spotTypeEntity.getById(1);

			expect(result).toEqual(mockEntityModel);
		});
	});

	describe("getAll", () => {
		it("should return all spot types", async () => {
			jest.spyOn(mockRepository, "getAll").mockResolvedValueOnce([mockEntityModel]);

			const result = await spotTypeEntity.getAll();

			expect(result).toEqual([mockEntityModel]);
		});
	});

	describe("update", () => {
		it("should update spot type", async () => {
			jest.spyOn(mockRepository, "getById").mockResolvedValueOnce(mockEntityModel);
			jest.spyOn(mockRepository, "update").mockResolvedValueOnce(mockEntityModel);

			const result = await spotTypeEntity.update({
				spotTypeId: 1,
				spotTypeName: "Spot Type",
				description: "Spot Description",
				active: true,
				createdBy: 1,
				spotData: {}
			} as SpotTypeDTO);

			expect(result).toEqual(mockEntityModel);
		});

		it("should throw an error if spot type does not exist", async () => {
			jest.spyOn(mockRepository, "getById").mockResolvedValueOnce(null);

			spotTypeEntity.update({
				spotTypeId: 1,
				spotTypeName: "Spot Type",
				description: "Spot Description",
				active: true,
				createdBy: 1,
				spotData: {}
			} as SpotTypeDTO).catch(e => expect(e).toBeInstanceOf(Error));
		});
	});

	describe("delete", () => {
		it("should delete spot type", async () => {
			jest.spyOn(mockRepository, "getById").mockResolvedValueOnce(mockEntityModel);
			jest.spyOn(mockRepository, "delete").mockResolvedValueOnce(mockEntityModel);

			const result = await spotTypeEntity.delete(1);

			expect(result).toEqual(mockEntityModel);
		});

		it("should throw an error if spot type does not exist", async () => {
			jest.spyOn(mockRepository, "getById").mockResolvedValueOnce(null);

			spotTypeEntity.delete(1).catch(e => expect(e).toBeInstanceOf(Error));
		});
	});
});
