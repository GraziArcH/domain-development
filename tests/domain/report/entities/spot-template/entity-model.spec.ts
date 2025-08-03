import { SpotTemplateEntityModel } from "@/domain/report";

describe("SpotTemplateEntityModel", () => {
	it("should return an error if spotTemplateId is invalid", () => {
		const invalidSpotTemplateId = 0;
		const validSpotTemplateName = "TemplateName";
		const validSpotTitle = "SpotTitle";
		const validDescription = "Description";
		const validSpotLegend = "Legend";
		const validVersion = "1.0";
		const validSpotTypeId = 1;
		const validCreatedBy = 1;
		const validActive = true;
		const validDraft = true;
		const validFormatting = {};

		expect(() => SpotTemplateEntityModel.create(
			{
				spotTemplateId: invalidSpotTemplateId,
				spotTemplateName: validSpotTemplateName,
				spotTitle: validSpotTitle,
				description: validDescription,
				spotLegend: validSpotLegend,
				version: validVersion,
				spotTypeId: validSpotTypeId,
				createdBy: validCreatedBy,
				active: validActive,
				draft: validDraft,
				formatting: validFormatting
			}
		)).toThrow();
	});

	it("should return an error if spotTemplateName is invalid", () => {
		const validSpotTemplateId = 1;
		const invalidSpotTemplateName = "c".repeat(300);
		const validSpotTitle = "SpotTitle";
		const validDescription = "Description";
		const validSpotLegend = "Legend";
		const validVersion = "1.0";
		const validSpotTypeId = 1;
		const validCreatedBy = 1;
		const validActive = true;
		const validDraft = true;
		const validFormatting = {};

		expect(() => SpotTemplateEntityModel.create(
			{
				spotTemplateId: validSpotTemplateId,
				spotTemplateName: invalidSpotTemplateName,
				spotTitle: validSpotTitle,
				description: validDescription,
				spotLegend: validSpotLegend,
				version: validVersion,
				spotTypeId: validSpotTypeId,
				createdBy: validCreatedBy,
				active: validActive,
				draft: validDraft,
				formatting: validFormatting
			}
		)).toThrow();
	});

	it("should return an error if spotTitle is invalid", () => {
		const validSpotTemplateId = 1;
		const validSpotTemplateName = "TemplateName";
		const invalidSpotTitle = "c".repeat(300);
		const validDescription = "Description";
		const validSpotLegend = "Legend";
		const validVersion = "1.0";
		const validSpotTypeId = 1;
		const validCreatedBy = 1;
		const validActive = true;
		const validDraft = true;
		const validFormatting = {};

		expect(() => SpotTemplateEntityModel.create(
			{
				spotTemplateId: validSpotTemplateId,
				spotTemplateName: validSpotTemplateName,
				spotTitle: invalidSpotTitle,
				description: validDescription,
				spotLegend: validSpotLegend,
				version: validVersion,
				spotTypeId: validSpotTypeId,
				createdBy: validCreatedBy,
				active: validActive,
				draft: validDraft,
				formatting: validFormatting
			}
		)).toThrow();
	});

	it("should return an error if description is invalid", () => {
		const validSpotTemplateId = 1;
		const validSpotTemplateName = "TemplateName";
		const validSpotTitle = "SpotTitle";
		const invalidDescription = "c".repeat(300);
		const validSpotLegend = "Legend";
		const validcolorPaletteId = 1;
		const validVersion = "1.0";
		const validSpotTypeId = 1;
		const validCreatedBy = 1;
		const validActive = true;
		const validDraft = true;
		const validFormatting = {};

		expect(() => SpotTemplateEntityModel.create(
			{
				spotTemplateId: validSpotTemplateId,
				spotTemplateName: validSpotTemplateName,
				spotTitle: validSpotTitle,
				description: invalidDescription,
				spotLegend: validSpotLegend,
				version: validVersion,
				spotTypeId: validSpotTypeId,
				createdBy: validCreatedBy,
				active: validActive,
				draft: validDraft,
				formatting: validFormatting
			}
		)).toThrow();
	});


	it("should return an error if spotLegend is invalid", () => {
		const validSpotTemplateId = 1;
		const validSpotTemplateName = "TemplateName";
		const validSpotTitle = "SpotTitle";
		const validDescription = "Description";
		const invalidSpotLegend = "c".repeat(300);
		const validcolorPaletteId = 1;
		const validVersion = "1.0";
		const validSpotTypeId = 1;
		const validCreatedBy = 1;
		const validActive = true;
		const validDraft = true;
		const validFormatting = {};

		expect(() => SpotTemplateEntityModel.create(
			{
				spotTemplateId: validSpotTemplateId,
				spotTemplateName: validSpotTemplateName,
				spotTitle: validSpotTitle,
				description: validDescription,
				spotLegend: invalidSpotLegend,
				version: validVersion,
				spotTypeId: validSpotTypeId,
				createdBy: validCreatedBy,
				active: validActive,
				draft: validDraft,
				formatting: validFormatting
			}
		)).toThrow();
	});

	it("should return an error if version is invalid", () => {
		const validSpotTemplateId = 1;
		const validSpotTemplateName = "TemplateName";
		const validSpotTitle = "SpotTitle";
		const validDescription = "Description";
		const validSpotLegend = "Legend";
		const validcolorPaletteId = 1;
		const invalidVersion = "c".repeat(300);
		const validSpotTypeId = 1;
		const validCreatedBy = 1;
		const validActive = true;
		const validDraft = true;
		const validFormatting = {};

		expect(() => SpotTemplateEntityModel.create(
			{
				spotTemplateId: validSpotTemplateId,
				spotTemplateName: validSpotTemplateName,
				spotTitle: validSpotTitle,
				description: validDescription,
				spotLegend: validSpotLegend,
				version: invalidVersion,
				spotTypeId: validSpotTypeId,
				createdBy: validCreatedBy,
				active: validActive,
				draft: validDraft,
				formatting: validFormatting
			}
		)).toThrow();
	});

	it("should return an error if spotTypeId is invalid", () => {
		const validSpotTemplateId = 1;
		const validSpotTemplateName = "TemplateName";
		const validSpotTitle = "SpotTitle";
		const validDescription = "Description";
		const validSpotLegend = "Legend";
		const validcolorPaletteId = 1;
		const validVersion = "1.0";
		const invalidSpotTypeId = -1;
		const validCreatedBy = 1;
		const validActive = true;
		const validDraft = true;
		const validFormatting = {};

		expect(() => SpotTemplateEntityModel.create(
			{
				spotTemplateId: validSpotTemplateId,
				spotTemplateName: validSpotTemplateName,
				spotTitle: validSpotTitle,
				description: validDescription,
				spotLegend: validSpotLegend,
				version: validVersion,
				spotTypeId: invalidSpotTypeId,
				createdBy: validCreatedBy,
				active: validActive,
				draft: validDraft,
				formatting: validFormatting
			}
		)).toThrow();
	});

	it("should return an error if createdBy is invalid", () => {
		const validSpotTemplateId = 1;
		const validSpotTemplateName = "TemplateName";
		const validSpotTitle = "SpotTitle";
		const validDescription = "Description";
		const validSpotLegend = "Legend";
		const validcolorPaletteId = 1;
		const validVersion = "1.0";
		const validSpotTypeId = 1;
		const invalidCreatedBy = -1;
		const validActive = true;
		const validDraft = true;
		const validFormatting = {};

		expect(() => SpotTemplateEntityModel.create(
			{
				spotTemplateId: validSpotTemplateId,
				spotTemplateName: validSpotTemplateName,
				spotTitle: validSpotTitle,
				description: validDescription,
				spotLegend: validSpotLegend,
				version: validVersion,
				spotTypeId: validSpotTypeId,
				createdBy: invalidCreatedBy,
				active: validActive,
				draft: validDraft,
				formatting: validFormatting
			}
		)).toThrow();
	});

	it("should create a SpotTemplateEntityModel instance with valid values", () => {
		const validSpotTemplateId = 1;
		const validSpotTemplateName = "TemplateName";
		const validSpotTitle = "SpotTitle";
		const validDescription = "Description";
		const validSpotLegend = "Legend";
		const validcolorPaletteId = 1;
		const validVersion = "1.0";
		const validSpotTypeId = 1;
		const validCreatedBy = 1;
		const validActive = true;
		const validDraft = true;
		const validFormatting = {};

		const sut = SpotTemplateEntityModel.create(
			{
				spotTemplateId: validSpotTemplateId,
				spotTemplateName: validSpotTemplateName,
				spotTitle: validSpotTitle,
				description: validDescription,
				spotLegend: validSpotLegend,
				version: validVersion,
				spotTypeId: validSpotTypeId,
				createdBy: validCreatedBy,
				active: validActive,
				draft: validDraft,
				formatting: validFormatting
			}
		) as SpotTemplateEntityModel;

		expect(sut).toBeInstanceOf(SpotTemplateEntityModel);
	});
});