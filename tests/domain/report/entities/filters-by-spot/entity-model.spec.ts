import { FiltersBySpotEntityModel } from "@/domain/report";

describe("FiltersBySpotEntityModel", () => {
	it("should return an error if filtersBySpotId is invalid", () => {
		const invalidFiltersBySpotId = -1;
		const validSpotTemplateId = 1;
		const validFilterId = 2;
		const validActive = true;
		const validCreatedBy = 1;

		expect(() => FiltersBySpotEntityModel.create({
			filtersBySpotId: invalidFiltersBySpotId,
			spotTemplateId: validSpotTemplateId,
			filterId: validFilterId,
			active: validActive,
			createdBy: validCreatedBy
		})).toThrow(Error);
	});

	it("should return an error if spotTemplateId is invalid", () => {
		const validFiltersBySpotId = 1;
		const invalidSpotTemplateId = -2;
		const validFilterId = 2;
		const validActive = true;
		const validCreatedBy = 1;

		expect(() => FiltersBySpotEntityModel.create({
			filtersBySpotId: validFiltersBySpotId,
			spotTemplateId: invalidSpotTemplateId,
			filterId: validFilterId,
			active: validActive,
			createdBy: validCreatedBy
		})).toThrow(Error);
	});

	it("should return an error if filterId is invalid", () => {
		const validFiltersBySpotId = 1;
		const validSpotTemplateId = 2;
		const invalidFilterId = -3;
		const validActive = true;
		const validCreatedBy = 1;

		expect(() => FiltersBySpotEntityModel.create({
			filtersBySpotId: validFiltersBySpotId,
			spotTemplateId: validSpotTemplateId,
			filterId: invalidFilterId,
			active: validActive,
			createdBy: validCreatedBy
		})).toThrow(Error);
	});

	it("should create a FiltersBySpotEntityModel instance with valid values", () => {
		const validFiltersBySpotId = 1;
		const validSpotTemplateId = 2;
		const validFilterId = 3;
		const validActive = true;
		const validCreatedBy = 1;

		const sut = FiltersBySpotEntityModel.create({
			filtersBySpotId: validFiltersBySpotId,
			spotTemplateId: validSpotTemplateId,
			filterId: validFilterId,
			active: validActive,
			createdBy: validCreatedBy
		}) as FiltersBySpotEntityModel;

		expect(sut).toBeInstanceOf(FiltersBySpotEntityModel);
		expect(sut.filtersBySpotId.value).toBe(validFiltersBySpotId);
		expect(sut.spotTemplateId.value).toBe(validSpotTemplateId);
		expect(sut.filterId.value).toBe(validFilterId);
	});
});