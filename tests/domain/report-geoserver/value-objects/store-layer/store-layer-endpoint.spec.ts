import { StoreLayerDescriptionValueObject } from "@/domain/report-geoserver";

describe("StoreLayerDescriptionValueObject", () => {
	it("should return InvalidStoreLayerDescriptionValueObjectError for an invalid store layer description (null)", () => {
		const invalidStoreLayerDescription = null;

		expect(() => StoreLayerDescriptionValueObject.create(invalidStoreLayerDescription)).toThrow();
	});

	it("should return InvalidStoreLayerDescriptionValueObjectError for an invalid store layer description (number)", () => {
		const invalidStoreLayerDescription = 123;

		expect(() => StoreLayerDescriptionValueObject.create(invalidStoreLayerDescription as unknown as string)).toThrow();
	});

	it("should return InvalidStoreLayerDescriptionValueObjectError for an invalid store layer description (empty string)", () => {
		const invalidStoreLayerDescription = "";

		expect(() => StoreLayerDescriptionValueObject.create(invalidStoreLayerDescription)).toThrow();
	});

	it("should return InvalidStoreLayerDescriptionValueObjectError for an invalid store layer description (string with length > 255)", () => {
		const invalidStoreLayerDescription = "c".repeat(256);

		expect(() => StoreLayerDescriptionValueObject.create(invalidStoreLayerDescription)).toThrow();
	});

	it("should create a StoreLayerDescriptionValueObject instance with a valid store layer description", () => {
		const validStoreLayerDescription = "ValidStoreLayerDescription";

		const sut = StoreLayerDescriptionValueObject.create(validStoreLayerDescription);

		expect(sut).toBeInstanceOf(StoreLayerDescriptionValueObject);
	});
});
