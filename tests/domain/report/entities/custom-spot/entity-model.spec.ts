import { CustomSpotEntityModel } from "@/domain/report";
import { CustomSpotDTO } from "@/domain/report";

describe("CustomSpotEntityModel", () => {
	it("should return an error for invalid customTemplateId", () => {
		const invalidCustomTemplateId = -1;
		const validOrder = 1;

		expect(() => CustomSpotEntityModel.create({
			customSpotId: invalidCustomTemplateId,
			spotTemplateName: "Name",
			userId: 3,
			filters: '{}',
			order: validOrder
		} as CustomSpotDTO)).toThrow();
	});

	it("should return an error for invalid spotTemplateId", () => {
		const invalidSpotTemplateName = "";
		const validOrder = 1;

		expect(() => CustomSpotEntityModel.create({
			customSpotId: 1,
			spotTemplateName: invalidSpotTemplateName,
			userId: 3,
			filters: '{}',
			order: validOrder
		} as CustomSpotDTO)).toThrow();
	});

	it("should return an error for invalid userId", () => {
		const invalidUserId = -1;
		const validOrder = 1;

		expect(() => CustomSpotEntityModel.create({
			customSpotId: 1,
			spotTemplateName: "Name",
			userId: invalidUserId,
			filters: '{}',
			order: validOrder
		} as CustomSpotDTO)).toThrow();
	});


	it("should return an error for invalid order", () => {
		const invalidOrder = -1;

		expect(() => CustomSpotEntityModel.create({
			customSpotId: 1,
			spotTemplateName: "Name",
			userId: 3,
			filters: '{}',
			order: invalidOrder
		} as CustomSpotDTO)).toThrow();
	});

	it("should create a CustomSpotEntityModel instance", () => {
		const customTemplateId = 1;
		const spotTemplateName = "Name";
		const userId = 3;
		const filters = '{}';
		const order = 1;

		const result = CustomSpotEntityModel.create({
			customSpotId: customTemplateId,
			spotTemplateName: spotTemplateName,
			userId: userId,
			filters: filters,
			order: order
		} as CustomSpotDTO) as CustomSpotEntityModel;

		expect(result).toBeInstanceOf(CustomSpotEntityModel);

	});
});