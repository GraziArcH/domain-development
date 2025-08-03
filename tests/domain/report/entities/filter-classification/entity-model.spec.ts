import { FilterClassificationEntityModel } from "@/domain/report";

describe("FilterClassificationEntityModel", () => {
	it("should return an error for invalid filterClassificationId", () => {
		const invalidFilterClassificationId = -1;

		expect(() => FilterClassificationEntityModel.create({
			filterClassificationId: invalidFilterClassificationId,
			classification: "Classification",
			createdBy: 1,
			active: true
		})).toThrow(Error);
	});

	it("should return an error for invalid createdBy", () => {
		const invalidCreatedBy = -1;

		expect(() => FilterClassificationEntityModel.create({
			filterClassificationId: 1,
			classification: "Classification",
			createdBy: invalidCreatedBy,
			active: true
		})).toThrow(Error);
	});

	it("should return an error for invalid classification", () => {
		const invalidClassification = "";

		expect(() => FilterClassificationEntityModel.create({
			filterClassificationId: 1,
			classification: invalidClassification,
			createdBy: 1,
			active: true
		})).toThrow(Error);
	});

	it("should create a FilterClassificationEntityModel instance", () => {
		const filterClassificationId = 1;
		const createdBy = 2;
		const classification = "Classification";

		const result = FilterClassificationEntityModel.create({
			filterClassificationId: filterClassificationId,
			classification: classification,
			createdBy: createdBy,
			active: true
		}) as FilterClassificationEntityModel;

		expect(result).toBeInstanceOf(FilterClassificationEntityModel);
		expect(result.filterClassificationId.value).toBe(filterClassificationId);
		expect(result.classification.value).toBe(classification);
	});
});
