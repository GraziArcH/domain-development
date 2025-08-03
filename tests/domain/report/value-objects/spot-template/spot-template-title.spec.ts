import {
	InvalidSpotTitleValueObjectError,
	SpotTitleValueObject,
} from "@/domain/report"; 

describe("SpotTitleValueObject", () => {
	it("should return InvalidSpotTitleValueObjectError for an invalid spot title (null)", () => {
		const invalidSpotTitle = null;

		expect(() => SpotTitleValueObject.create(invalidSpotTitle)).toThrow(InvalidSpotTitleValueObjectError);
	});

	it("should return InvalidSpotTitleValueObjectError for an invalid spot title (number)", () => {
		const invalidSpotTitle = 123;

		expect(() => SpotTitleValueObject.create(invalidSpotTitle as unknown as string)).toThrow(InvalidSpotTitleValueObjectError);
	});

	it("should return InvalidSpotTitleValueObjectError for an invalid spot title (empty string)", () => {
		const invalidSpotTitle = "";

		expect(() => SpotTitleValueObject.create(invalidSpotTitle)).toThrow(InvalidSpotTitleValueObjectError);
	});

	it("should return InvalidSpotTitleValueObjectError for an invalid spot title (string with length > 60)", () => {
		const invalidSpotTitle = "InvalidSpotTitleWithTitleLengthMoreThanSixtyCharactersaaaaaaa";

		expect(() => SpotTitleValueObject.create(invalidSpotTitle)).toThrow(InvalidSpotTitleValueObjectError);
	});

	it("should create a SpotTitleValueObject instance with a valid spot title", () => {
		const validSpotTitle = "BasicSpotTitle";

		const sut = SpotTitleValueObject.create(validSpotTitle);

		if (!(sut instanceof Error)) expect(sut.value).toBe(validSpotTitle);
		expect(sut).toBeInstanceOf(SpotTitleValueObject);
	});
});
