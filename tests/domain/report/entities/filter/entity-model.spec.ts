import { FilterEntityModel } from "@/domain/report";

describe("FilterEntityModel", () => {
	it("should return an error for invalid filterId", () => {
		const invalidFilterId = -1;

		expect(() => FilterEntityModel.create({
			filterId: invalidFilterId,
			parentId: 2,
			createdAt: 1,
			description: "FilterDescription",
			value: "FilterValue",
			createdBy: 1,
			filterClassificationId: 1,
			filterValueTypeId: 1,
			order: 1,
			active: true,
			filterActionId: 1
		})).toThrow(Error);
	});

	it("should return an error for invalid filterTypeId", () => {
		const invalidFilterTypeId = -1;

		expect(() => FilterEntityModel.create({
			filterId: 1,
			parentId: invalidFilterTypeId,
			createdAt: 1,
			description: "FilterDescription",
			value: "FilterValue",
			createdBy: 1,
			filterClassificationId: 1,
			filterValueTypeId: 1,
			order: 1,
			active: true,
			filterActionId: 1
		})).toThrow(Error);
	});

	it("should return an error for invalid filterActionId", () => {
		const invalidFilterActionId = -1;

		expect(() => FilterEntityModel.create({
			filterId: 1,
			parentId: 1,
			createdAt: 1,
			description: "FilterDescription",
			value: "FilterValue",
			createdBy: 1,
			filterClassificationId: 1,
			filterValueTypeId: 1,
			order: 1,
			active: true,
			filterActionId: invalidFilterActionId
		})).toThrow(Error);
	});

	it("should return an error for invalid description", () => {
		const invalidDescription = "";

		expect(() => FilterEntityModel.create({
			filterId: 1,
			parentId: 2,
			createdAt: 1,
			description: invalidDescription,
			value: "FilterValue",
			createdBy: 1,
			filterClassificationId: 1,
			filterValueTypeId: 1,
			order: 1,
			active: true,
			filterActionId: 1
		})).toThrow(Error);
	});

	it("should return an error for invalid value", () => {
		const invalidValue = "";

		expect(() => FilterEntityModel.create({
			filterId: 1,
			parentId: 2,
			createdAt: 1,
			description: "FilterDescription",
			value: invalidValue,
			createdBy: 1,
			filterClassificationId: 1,
			filterValueTypeId: 1,
			order: 1,
			active: true,
			filterActionId: 1
		})).toThrow(Error);
	});

	it("should create a FilterEntityModel instance", () => {
		const filterId = 1;
		const filterTypeId = 2;
		const name = "FilterName";
		const description = "FilterDescription";
		const value = "FilterValue";

		const result = FilterEntityModel.create({
			filterId: filterId,
			parentId: filterTypeId,
			description: description,
			value: value,
			createdBy: 1,
			filterClassificationId: 1,
			filterValueTypeId: 1,
			order: 1,
			active: true,
			filterActionId: 1,
			createdAt: 1
		}) as FilterEntityModel;

		expect(result).toBeInstanceOf(FilterEntityModel);

	});
});
