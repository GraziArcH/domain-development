import { LayerNameValueObject } from "@/domain/report-geoserver";

describe("LayerNameValueObject", () => {
	it("should return InvalidLayerNameValueObjectError for an invalid layer name (null)", () => {
		const invalidLayerName = null;

		expect(() => LayerNameValueObject.create(invalidLayerName)).toThrow();
	});

	it("should return InvalidLayerNameValueObjectError for an invalid layer name (number)", () => {
		const invalidLayerName = 123;

		expect(() => LayerNameValueObject.create(invalidLayerName as unknown as string)).toThrow();
	});

	it("should return InvalidLayerNameValueObjectError for an invalid layer name (empty string)", () => {
		const invalidLayerName = "";

		expect(() => LayerNameValueObject.create(invalidLayerName)).toThrow();
	});

	it("should return InvalidLayerNameValueObjectError for an invalid layer name (string with length > 255)", () => {
		const invalidLayerName = "c".repeat(256);

		expect(() => LayerNameValueObject.create(invalidLayerName)).toThrow();
	});

	it("should create a LayerNameValueObject instance with a valid layer name", () => {
		const validLayerName = "ValidLayerName";

		const sut = LayerNameValueObject.create(validLayerName);

		expect(sut).toBeInstanceOf(LayerNameValueObject);
	});
});
