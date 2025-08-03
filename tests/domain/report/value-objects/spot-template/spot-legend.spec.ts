import {
	InvalidSpotTemplateLegendValueObjectError,
	SpotTemplateLegendValueObject,
} from "@/domain/report"; 

describe("SpotTemplateLegendValueObject", () => {
	it("should return InvalidSpotTemplateLegendValueObjectError for an invalid spot legend (null)", () => {
		const invalidSpotLegend = null;

		expect(() => SpotTemplateLegendValueObject.create(invalidSpotLegend)).toThrow(InvalidSpotTemplateLegendValueObjectError);
	});

	it("should return InvalidSpotTemplateLegendValueObjectError for an invalid spot legend (number)", () => {
		const invalidSpotLegend = 123;

		expect(() => SpotTemplateLegendValueObject.create(invalidSpotLegend as unknown as string)).toThrow(InvalidSpotTemplateLegendValueObjectError);
	});

	
	it("should return InvalidSpotTemplateLegendValueObjectError for an invalid spot legend (string with length > 50)", () => {
		const invalidSpotLegend = "c".repeat(51);

		expect(() => SpotTemplateLegendValueObject.create(invalidSpotLegend)).toThrow(InvalidSpotTemplateLegendValueObjectError);
	});

	it("should create a SpotTemplateLegendValueObject instance with a valid spot legend", () => {
		const validSpotLegend = "BasicSpotLegend";

		const sut = SpotTemplateLegendValueObject.create(validSpotLegend);

		if (!(sut instanceof Error)) expect(sut.value).toBe(validSpotLegend);
		expect(sut).toBeInstanceOf(SpotTemplateLegendValueObject);
	});
});
