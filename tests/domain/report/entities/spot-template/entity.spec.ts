import {
	ISpotTemplateRepository,
	SpotTemplateEntityModel,
	SpotTemplateDTO,
	SpotTemplateEntity,
	SpotTemplateDTOWithoutId,
} from "@/domain/report";

describe("SpotTemplateEntity", () => {
	let mockRepository: ISpotTemplateRepository;
	let spotTemplateEntity: SpotTemplateEntity;
	const mockEntityModel = SpotTemplateEntityModel.create({
		spotTemplateId: 1,
		spotTemplateName: "Spot Template",
		spotTitle: "Spot Title",
		description: "Spot Description",
		spotLegend: "Legend",
		version: "1.0",
		spotTypeId: 1,
		createdBy: 1,
		active: true,
		draft: true,
		formatting: {}
	}) as SpotTemplateEntityModel;

	beforeEach(() => {
		mockRepository = {
			create: jest.fn(),
			getById: jest.fn(),
			getByLineTemplateId: jest.fn(),
			getByName: jest.fn(),
			getAll: jest.fn(),
			deactivateOthersByName: jest.fn(),
			findTemplates: jest.fn(),
			softDelete: jest.fn(),
			update: jest.fn(),
			delete: jest.fn(),
		};

		spotTemplateEntity = new SpotTemplateEntity(mockRepository);
	});

	describe("create", () => {
		it("should throw an error for an invalid entity model", async () => {
			await expect(async () => {
				await spotTemplateEntity.create({
					spotTemplateName: "",
					spotTitle: "",
					description: "",
					spotLegend: "",
					version: "",
					spotTypeId: -1,
					createdBy: 1,
					active: true,
					draft: true,
					formatting: {}
				});
			}).rejects.toThrow();
		});

		it("should create spot template", async () => {
			jest.spyOn(mockRepository, "create").mockResolvedValueOnce(mockEntityModel);

			const result = await spotTemplateEntity.create({
				spotTemplateName: "Spot Template",
				spotTitle: "Spot Title",
				description: "Spot Description",
				spotLegend: "Legend",
				version: "1.0",
				spotTypeId: 1,
				createdBy: 1,
				active: true,
				draft: true,
				formatting: {}
			});

			expect(result).toEqual(mockEntityModel);
		});
	});

	describe("update", () => {
		it("should update spot template", async () => {
			jest.spyOn(mockRepository, "getById").mockResolvedValueOnce(mockEntityModel);
			jest.spyOn(mockRepository, "update").mockResolvedValueOnce(mockEntityModel);

			const result = await spotTemplateEntity.update({
				spotTemplateId: 1,
				spotTemplateName: "Spot Template",
				spotTitle: "Spot Title",
				description: "Spot Description",
				spotLegend: "Legend",
				version: "1.0",
				spotTypeId: 1,
				createdBy: 1,
				active: true,
				draft: true,
				formatting: {}
			});

			expect(result).toEqual(mockEntityModel);
		});

		it("should throw an error if spot template does not exist", async () => {
			jest.spyOn(mockRepository, "getById").mockResolvedValueOnce(null);

			await expect(async () => {
				await spotTemplateEntity.update({
					spotTemplateId: 1,
					spotTemplateName: "Spot Template",
					spotTitle: "Spot Title",
					description: "Spot Description",
					spotLegend: "Legend",
					version: "1.0",
					spotTypeId: 1,
					createdBy: 1,
					active: true,
					draft: true,
					formatting: {}
				});
			}).rejects.toThrow();
		});
	});

	describe("delete", () => {
		it("should delete spot template", async () => {
			jest.spyOn(mockRepository, "getById").mockResolvedValueOnce(mockEntityModel);
			jest.spyOn(mockRepository, "delete").mockResolvedValueOnce(mockEntityModel);

			const result = await spotTemplateEntity.delete(1);

			expect(result).toEqual(mockEntityModel);
		});

		it("should throw an error if spot template does not exist", async () => {
			jest.spyOn(mockRepository, "getById").mockResolvedValueOnce(null);

			await expect(async () => {
				await spotTemplateEntity.delete(1);
			}).rejects.toThrow();
		});
	});
});
