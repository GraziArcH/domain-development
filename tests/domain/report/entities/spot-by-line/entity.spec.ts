import {
	ISpotByLineRepository,
	SpotByLineEntityModel,
	SpotByLineDTO,
	SpotByLineEntity,
	SpotByLineDTOWithoutId,
} from "@/domain/report";

describe("SpotByLineEntity", () => {
	let mockRepository: ISpotByLineRepository;
	let spotByLineEntity: SpotByLineEntity;
	const mockEntityModel = SpotByLineEntityModel.create({
		spotByLineId: 1,
		lineTemplateId: 1,
		spotTemplateName: 'SpotTemplateA',
		active: true,
		createdBy: 1,
		spotOrder: 1
	} as SpotByLineDTO);

	beforeEach(() => {
		mockRepository = {
			create: jest.fn(),
			getById: jest.fn(),
			getAll: jest.fn(),
			update: jest.fn(),
			delete: jest.fn(),
		};

		spotByLineEntity = new SpotByLineEntity(mockRepository);
	});

	describe("create", () => {
		it("should throw an error for an invalid entity model", async () => {
			await expect(async () => {
				await spotByLineEntity.create({
					lineTemplateId: -1,
					spotTemplateName: '',
					active: true,
					createdBy: -1,
					spotOrder: -1
				} as SpotByLineDTOWithoutId);
			}).rejects.toThrow();
		});

		it("should create spot by line", async () => {
			jest.spyOn(mockRepository, "create").mockResolvedValueOnce(mockEntityModel);

			const result = await spotByLineEntity.create({
				lineTemplateId: 1,
				spotTemplateName: 'SpotTemplateA',
				active: true,
				createdBy: 1,
				spotOrder: 1
			} as SpotByLineDTOWithoutId);

			expect(result).toEqual(mockEntityModel);
		});
	});

	describe("getById", () => {
		it("should throw an error for an invalid spot by line id", async () => {
			await expect(async () => {
				await spotByLineEntity.getById(0);
			}).rejects.toThrow();
		});
	});

	describe("update", () => {
		it("should throw an error for an invalid entity model", async () => {
			await expect(async () => {
				await spotByLineEntity.update({
					spotByLineId: -1,
					lineTemplateId: 1,
					spotTemplateName: 'SpotTemplateA',
					active: true,
					createdBy: 1,
					spotOrder: 1
				} as SpotByLineDTO);
			}).rejects.toThrow();
		});

		it("should throw an error for a non-existing spot by line", async () => {
			jest.spyOn(mockRepository, "getById").mockResolvedValueOnce(null);

			await expect(async () => {
				await spotByLineEntity.update({
					spotByLineId: 1,
					lineTemplateId: 1,
					spotTemplateName: 'SpotTemplateA',
					active: true,
					createdBy: 1,
					spotOrder: 1
				} as SpotByLineDTO);
			}).rejects.toThrow();
		});

		it("should update spot by line", async () => {
			jest.spyOn(mockRepository, "getById").mockResolvedValueOnce(mockEntityModel);
			jest.spyOn(mockRepository, "update").mockResolvedValueOnce(mockEntityModel);

			const result = await spotByLineEntity.update({
				spotByLineId: 1,
				lineTemplateId: 1,
				spotTemplateName: 'SpotTemplateA',
				active: true,
				createdBy: 1,
				spotOrder: 1
			} as SpotByLineDTO);

			expect(result).toEqual(mockEntityModel);
		});
	});

	describe("delete", () => {
		it("should throw an error for an invalid spot by line id", async () => {
			await expect(async () => {
				await spotByLineEntity.delete(0);
			}).rejects.toThrow();
		});

		it("should throw an error for a non-existing spot by line", async () => {
			jest.spyOn(mockRepository, "getById").mockResolvedValueOnce(null);

			await expect(async () => {
				await spotByLineEntity.delete(1);
			}).rejects.toThrow();
		});

		it("should delete spot by line", async () => {
			jest.spyOn(mockRepository, "getById").mockResolvedValueOnce(mockEntityModel);
			jest.spyOn(mockRepository, "delete").mockResolvedValueOnce(mockEntityModel);

			const result = await spotByLineEntity.delete(1);

			expect(result).toEqual(mockEntityModel);
		});
	});
});
