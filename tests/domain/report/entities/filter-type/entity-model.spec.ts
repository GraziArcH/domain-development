import { FilterValueTypeEntityModel } from "@/domain/report";

describe("FilterValueTypeEntityModel", () => {
	it("should return an error if filterTypeId is invalid", () => {
		const invalidFilterTypeId = -1;
		const validName = "Valid name";
		const validCreatedBy = 1;
		const validActive = true;

		expect(() => FilterValueTypeEntityModel.create({
			filterValueTypeId: invalidFilterTypeId,
			valueType: validName,
			createdBy: validCreatedBy,
			active: validActive
		})).toThrow(Error);
	});

	it("should return an error if name is invalid", () => {
		const validFilterTypeId = 1;
		const invalidName = "";
		const validCreatedBy = 1;
		const validActive = true;

		expect(() => FilterValueTypeEntityModel.create({
			filterValueTypeId: validFilterTypeId,
			valueType: invalidName,
			createdBy: validCreatedBy,
			active: validActive
		})).toThrow(Error);
	});

	it("should return an error if createdBy is invalid", () => {
		const validFilterTypeId = 1;
		const validName = "Valid name";
		const invalidCreatedBy = -1;
		const validActive = true;

		expect(() => FilterValueTypeEntityModel.create({
			filterValueTypeId: validFilterTypeId,
			valueType: validName,
			createdBy: invalidCreatedBy,
			active: validActive
		})).toThrow(Error);
	});

	it("should create a FilterValueTypeEntityModel instance with valid values", () => {
		const validFilterTypeId = 1;
		const validName = "Valid name";
		const validCreatedBy = 1;
		const validActive = true;

		const sut = FilterValueTypeEntityModel.create({
			filterValueTypeId: validFilterTypeId,
			valueType: validName,
			createdBy: validCreatedBy,
			active: validActive
		}) as FilterValueTypeEntityModel;

		expect(sut).toBeInstanceOf(FilterValueTypeEntityModel);
		expect(sut.filterValueTypeId.value).toBe(validFilterTypeId);
		expect(sut.valueType.value).toBe(validName);
		expect(sut.createdBy.value).toBe(validCreatedBy);
		expect(sut.active).toBe(validActive);
	});
});
