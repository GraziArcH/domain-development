import { LineTemplateEntityModel } from "@/domain/report";
import { LineTemplateDTO } from "@/domain/report";

describe("LineTemplateEntityModel", () => {
	it("should throw Error if lineTemplateId is invalid", () => {
		const invalidLineTemplateId = -1;
		const validReportTemplateId = 1;
		const validActive = true; 
		const validCreatedBy = 1;
		const validTitle = "Title";
		const validDraggable = true;
		const validLineOrder = 1;
		const validLineName = 'Name';

		expect(() => {
			LineTemplateEntityModel.create({
				lineTemplateId: invalidLineTemplateId,
				reportTemplateId: validReportTemplateId,
				active: validActive,
				createdBy: validCreatedBy,
				title: validTitle,
				draggable: validDraggable,
				lineOrder: validLineOrder,
				name: validLineName
			} as LineTemplateDTO);
		}).toThrow();
	});


	it("should throw Error if title is invalid", () => {
		const validLineTemplateId = 1;
		const invalidTitle = "";
		const validReportTemplateId = 1;
		const validActive = true; 
		const validCreatedBy = 1;
		const validDraggable = true;
				const validLineOrder = 1;
				const validLineName = 'Name';


		expect(() => {
			LineTemplateEntityModel.create({
				lineTemplateId: validLineTemplateId,
				reportTemplateId: validReportTemplateId,
				active: validActive,
				createdBy: validCreatedBy,
				title: invalidTitle,
				draggable: validDraggable,
				lineOrder: validLineOrder,
				name: validLineName
			} as LineTemplateDTO);
		}).toThrow();
	});

	it("should throw Error if title is invalid", () => {
		const validLineTemplateId = 1;
		const invalidTitle = "";
		const validReportTemplateId = 1;
		const validActive = true; 
		const invalidCreatedBy = 1;
		const validDraggable = true;
				const validLineOrder = 1;
				const validLineName = 'Name';


		expect(() => {
			LineTemplateEntityModel.create({
				lineTemplateId: validLineTemplateId,
				reportTemplateId: validReportTemplateId,
				active: validActive,
				createdBy: invalidCreatedBy,
				title: invalidTitle,
				draggable: validDraggable,
				lineOrder: validLineOrder,
				name: validLineName
			} as LineTemplateDTO);
		}).toThrow();
	});

	it("should create a LineTemplateEntityModel instance with valid values", () => {
		const validLineTemplateId = 1;
		const validReportTemplateId = 1;
		const validActive = true; 
		const validCreatedBy = 1;
		const validTitle = "Title";
		const validDraggable = true;
		const validLineOrder = 1;
		const validLineName = 'Name';


		const result = LineTemplateEntityModel.create({
			lineTemplateId: validLineTemplateId,
			reportTemplateId: validReportTemplateId,
			active: validActive,
			createdBy: validCreatedBy,
			title: validTitle,
			draggable: validDraggable,
			lineOrder: validLineOrder,
			name: validLineName
		} as LineTemplateDTO);

		expect(result).toBeInstanceOf(LineTemplateEntityModel);
	});
});
