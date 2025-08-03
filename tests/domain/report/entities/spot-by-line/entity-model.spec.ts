import { SpotByLineEntityModel } from "@/domain/report";
import { SpotByLineDTO } from "@/domain/report";

describe("SpotByLineEntityModel", () => {
	it("should throw an error if spotByLineId is invalid", () => {
		const invalidSpotByLineId = -1;
		const validLineTemplateId = 1;
		const validSpotTemplateName = 'SpotTemplateA';
		const validActive = true;
		const validOrder = 1;
		const validCreatedBy = 1;

		expect(() => {
			SpotByLineEntityModel.create({
				spotByLineId: invalidSpotByLineId,
				lineTemplateId: validLineTemplateId,
				spotTemplateName: validSpotTemplateName,
				spotOrder: validOrder,
				active: validActive,
				createdBy: validCreatedBy
			} as SpotByLineDTO);
		}).toThrow();
	});

	it("should throw an error if lineTemplateId is invalid", () => {
		const validSpotByLineId = 1;
		const invalidLineTemplateId = -2;
		const validSpotTemplateName = 'SpotTemplateA';
		const validActive = true;
		const validOrder = 1;
		const validCreatedBy = 1;

		expect(() => {
			SpotByLineEntityModel.create({
				spotByLineId: validSpotByLineId,
				lineTemplateId: invalidLineTemplateId,
				spotTemplateName: validSpotTemplateName,
				spotOrder: validOrder,
				active: validActive,
				createdBy: validCreatedBy
			} as SpotByLineDTO);
		}).toThrow();
	});

	it("should throw an error if spotTemplateName is invalid", () => {
		const validSpotByLineId = 1;
		const validLineTemplateId = 2;
		const invalidSpotTemplateName = '';
		const validActive = true;
		const validOrder = 1;
		const validCreatedBy = 1;

		expect(() => {
			SpotByLineEntityModel.create({
				spotByLineId: validSpotByLineId,
				lineTemplateId: validLineTemplateId,
				spotTemplateName: invalidSpotTemplateName,
				spotOrder: validOrder,
				active: validActive,
				createdBy: validCreatedBy
			} as SpotByLineDTO);
		}).toThrow();
	});

	it("should throw an error if spotTemplateName is invalid", () => {
		const validSpotByLineId = 1;
		const validLineTemplateId = 2;
		const validSpotTemplateName = 'SpotTemplateA';
		const validActive = true;
		const invalidOrder = -1;
		const validCreatedBy = 1;

		expect(() => {
			SpotByLineEntityModel.create({
				spotByLineId: validSpotByLineId,
				lineTemplateId: validLineTemplateId,
				spotTemplateName: validSpotTemplateName,
				spotOrder: invalidOrder,
				active: validActive,
				createdBy: validCreatedBy
			} as SpotByLineDTO);
		}).toThrow();
	});

	it("should throw an error if createdBy is invalid", () => {
		const validSpotByLineId = 1;
		const validLineTemplateId = 2;
		const validSpotTemplateName = 'SpotTemplateA';
		const validActive = true;
		const validOrder = 1;
		const invalidCreatedBy = -1;

		expect(() => {
			SpotByLineEntityModel.create({
				spotByLineId: validSpotByLineId,
				lineTemplateId: validLineTemplateId,
				spotTemplateName: validSpotTemplateName,
				spotOrder: validOrder,
				active: validActive,
				createdBy: invalidCreatedBy
			} as SpotByLineDTO);
		}).toThrow();
	});

	it("should create a SpotByLineEntityModel instance with valid values", () => {
		const validSpotByLineId = 1;
		const validLineTemplateId = 2;
		const validSpotTemplateName = 'SpotTemplateA';
		const validActive = true;
		const validOrder = 1;
		const validCreatedBy = 1;

		const result = SpotByLineEntityModel.create({
			spotByLineId: validSpotByLineId,
			lineTemplateId: validLineTemplateId,
			spotTemplateName: validSpotTemplateName,
			spotOrder: validOrder,
			active: validActive,
			createdBy: validCreatedBy
		} as SpotByLineDTO);

		expect(result).toBeInstanceOf(SpotByLineEntityModel);
	});
});
