import {
	IMethodRepository,
	MethodEntityModel,
	MethodDTO,
	MethodDTOWithoutId,
	MethodEntity,
} from "@/domain/automation";

describe("MethodEntity", () => {
	let mockRepository: IMethodRepository;
	let methodEntity: MethodEntity;
	const mockEntityModel = MethodEntityModel.create({
		methodId: 1,
		onsMethodologyId: 1,
		methodDescription: "Method Description",
		residue: "Residue",
		skill: "Skill",
		errorMeasurements: 5,
	} as MethodDTO) as MethodEntityModel;

	beforeEach(() => {
		mockRepository = {
			create: jest.fn(),
			getAll: jest.fn(),
			update: jest.fn(),
			delete: jest.fn(),
			getById: jest.fn(),
		};

		methodEntity = new MethodEntity(mockRepository);
	});

	describe("create", () => {
		it("should return Error for an invalid entity model", async () => {
			await methodEntity.create({
				onsMethodologyId: -1,
				methodDescription: "",
				residue: "",
				skill: "",
				errorMeasurements: 5,
			} as MethodDTOWithoutId).catch(e => expect(e).toBeInstanceOf(Error));
		});

		it("should create method", async () => {
			jest.spyOn(mockRepository, "create").mockResolvedValueOnce(mockEntityModel as MethodEntityModel);

			const result = await methodEntity.create({
				onsMethodologyId: 1,
				methodDescription: "Method Description",
				residue: "Residue",
				skill: "Skill",
				errorMeasurements: 5,
			} as MethodDTOWithoutId);

			expect(result).toEqual(mockEntityModel);
		});
	});

	describe("getAll", () => {
		it("should return all methods", async () => {
			jest.spyOn(mockRepository, "getAll").mockResolvedValueOnce([mockEntityModel]);

			const result = await methodEntity.getAll();

			expect(result).toEqual([mockEntityModel]);
		});
	});

	describe("update", () => {
		it("should update method", async () => {
			jest.spyOn(mockRepository, "getById").mockResolvedValueOnce(mockEntityModel);
			jest.spyOn(mockRepository, "update").mockResolvedValueOnce(mockEntityModel);

			const result = await methodEntity.update({
				methodId: 1,
				onsMethodologyId: 1,
				methodDescription: "Method Description",
				residue: "Residue",
				skill: "Skill",
				errorMeasurements: 5,
			} as MethodDTO);

			expect(result).toEqual(mockEntityModel);
		});

		it("should return Error if method does not exist", async () => {
			jest.spyOn(mockRepository, "getById").mockResolvedValueOnce(null);

			await methodEntity.update({
				methodId: 1,
				onsMethodologyId: 1,
				methodDescription: "Method Description",
				residue: "Residue",
				skill: "Skill",
				errorMeasurements: 5,
			} as MethodDTO).catch(e => expect(e).toBeInstanceOf(Error));
		});
	});

	describe("delete", () => {
		it("should delete method", async () => {
			jest.spyOn(mockRepository, "getById").mockResolvedValueOnce(mockEntityModel);
			jest.spyOn(mockRepository, "delete").mockResolvedValueOnce(mockEntityModel);

			const result = await methodEntity.delete(1);

			expect(result).toEqual(mockEntityModel);
		});

		it("should return Error if method does not exist", async () => {
			jest.spyOn(mockRepository, "getById").mockResolvedValueOnce(null);

			await methodEntity.delete(1).catch(e => expect(e).toBeInstanceOf(Error));
		});
	});
});
