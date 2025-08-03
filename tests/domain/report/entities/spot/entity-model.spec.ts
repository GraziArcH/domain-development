import { SpotEntityModel } from "@/domain/report";

describe("SpotEntityModel", () => {
	it("should return an error if spotId is invalid", () => {
		const invalidSpotId = "";
		const validSpotTemplateId = "templateId";
		const validSpotData = "Spot Data";
		const validFilters = { primaryFilters: [], secondaryFilters: [], specificFilters: [] } ;
		const validSpotName = "Name";

		expect(() => SpotEntityModel.create(
			{
				spotId: invalidSpotId,
				spotTemplateId: validSpotTemplateId,
				spotData: validSpotData,
				filters: validFilters,
				spotName: validSpotName
			}
		)).toThrow();
	});

	it("should return an error if spotTemplate is invalid", () => {
		const validSpotId = "1";
		const invalidSpotTemplateId = "";
		const validSpotData = "Spot Data";
		const validFilters = { primaryFilters: [], secondaryFilters: [], specificFilters: [] } ;
		const validSpotName = "Name";

		expect(() => SpotEntityModel.create(
			{
				spotId: validSpotId,
				spotTemplateId: invalidSpotTemplateId,
				spotData: validSpotData,
				filters: validFilters,
				spotName: validSpotName
			}
		)).toThrow();
	});


	it("should return an error if spotData is invalid", () => {
		const validSpotId = "1";
		const validSpotTemplateId = "templateId";
		const invalidSpotData = "";
		const validFilters = { primaryFilters: [], secondaryFilters: [], specificFilters: [] };
		const validSpotName = "Name";

		expect(() => SpotEntityModel.create(
			{
				spotId: validSpotId,
				spotTemplateId: validSpotTemplateId,
				spotData: invalidSpotData,
				filters: validFilters,
				spotName: validSpotName
			}
		)).toThrow();
	});

	it("should create a SpotEntityModel instance with valid values", () => {
		const validSpotId = "spot123";
		const validSpotTemplateId = "templateId";
		const validSpotData = "Spot Data";
		const validFilters = { primaryFilters: [], secondaryFilters: [], specificFilters: [] };
		const validSpotName = "Name";

		const sut = SpotEntityModel.create(
			{
				spotId: validSpotId,
				spotTemplateId: validSpotTemplateId,
				spotData: validSpotData,
				filters: validFilters,
				spotName: validSpotName
			}
		) as SpotEntityModel;

		expect(sut).toBeInstanceOf(SpotEntityModel);
		expect(sut.spotId.value).toBe(validSpotId);
		expect(sut.spotTemplateId.value).toBe(validSpotTemplateId);
		expect(sut.spotData.value).toBe(validSpotData);
		expect(sut.filters).toEqual(validFilters);
	});
});