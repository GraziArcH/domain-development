import {
	ILayerRepository,
	LayerEntityModel,
	LayerDTO,
	LayerEntity,
	LayerWithoutIdDTO,
} from "@/domain/report-geoserver";

describe("LayerEntity", () => {
	let mockRepository: ILayerRepository;
	let layerEntity: LayerEntity;
	const mockEntityModel = LayerEntityModel.create({
		id: 1,
		idStore: 1,
		idWorkspace: 1,
		name: "Test Layer",
		type: "Test Type",
		fileKey: "key",
		filePath: "/path/to/layer",
		geoserverResponseCode: 200,
		status: true,
		persistedInStoreAt: new Date(),
		sendToGeoserverAt: new Date()
	} as LayerDTO);

	beforeEach(() => {
		mockRepository = {
			create: jest.fn(),
			getById: jest.fn(),
			getByName: jest.fn(),
			getAll: jest.fn(),
			update: jest.fn(),
			delete: jest.fn(),
		};

		layerEntity = new LayerEntity(mockRepository);
	});

	describe("create", () => {
		it("should return Error for an invalid entity model", async () => {
			await layerEntity.create({
				idStore: 1,
				idWorkspace: 1,
				name: "",
				type: "Test Type",
				filePath: "/path/to/layer",
				fileKey: "key",
				geoserverResponseCode: 200,
				status: true,
				persistedInStoreAt: new Date(),
				sendToGeoserverAt: new Date()
			} as LayerWithoutIdDTO).catch(e => expect(e).toBeInstanceOf(Error));
		});

		it("should create layer", async () => {
			jest.spyOn(mockRepository, "create").mockReturnValueOnce(Promise.resolve(mockEntityModel as LayerEntityModel));

			const result = await layerEntity.create({
				idStore: 1,
				idWorkspace: 1,
				name: "Test Layer",
				type: "Test Type",
				filePath: "/path/to/layer",
				fileKey: "key",
				geoserverResponseCode: 200,
				status: true,
				persistedInStoreAt: new Date(),
				sendToGeoserverAt: new Date()
			} as LayerWithoutIdDTO);

			expect(result).toEqual(mockEntityModel);
		});
	});

	describe("getById", () => {
		it("should return Error for an invalid layer id", async () => {
			await layerEntity.getById(0).catch(e => expect(e).toBeInstanceOf(Error));
		});
	});

	describe("update", () => {
		it("should return Error for an invalid entity model", async () => {
			await layerEntity.update({
				id: -1,
				idStore: 1,
				idWorkspace: 1,
				name: "Test Layer",
				type: "Test Type",
				filePath: "/path/to/layer",
				geoserverResponseCode: 200,
				status: true,
				persistedInStoreAt: new Date(),
				sendToGeoserverAt: new Date()
			} as LayerDTO).catch(e => expect(e).toBeInstanceOf(Error));
		});

		it("should return Error for a non-existing layer", async () => {
			jest.spyOn(mockRepository, "getById").mockReturnValueOnce(null);

			await layerEntity.update({
				id: 1,
				idStore: 1,
				idWorkspace: 1,
				name: "Test Layer",
				type: "Test Type",
				filePath: "/path/to/layer",
				geoserverResponseCode: 200,
				status: true,
				persistedInStoreAt: new Date(),
				sendToGeoserverAt: new Date()
			} as LayerDTO).catch(e => expect(e).toBeInstanceOf(Error));
		});

		it("should update layer", async () => {
			jest.spyOn(mockRepository, "getById").mockReturnValueOnce(Promise.resolve(mockEntityModel as LayerEntityModel));
			jest.spyOn(mockRepository, "update").mockReturnValueOnce(Promise.resolve(mockEntityModel as LayerEntityModel));

			const result = await layerEntity.update({
				id: 1,
				idStore: 1,
				idWorkspace: 1,
				name: "Test Layer",
				type: "Test Type",
				filePath: "/path/to/layer",
				geoserverResponseCode: 200,
				status: true,
				fileKey: "key",
				persistedInStoreAt: new Date(),
				sendToGeoserverAt: new Date()
			} as LayerDTO);

			expect(result).toEqual(mockEntityModel);
		});
	});

	describe("delete", () => {
		it("should return Error for an invalid layer id", async () => {
			await layerEntity.delete(0).catch(e => expect(e).toBeInstanceOf(Error));
		});

		it("should return Error for a non-existing layer", async () => {
			jest.spyOn(mockRepository, "getById").mockReturnValueOnce(null);

			await layerEntity.delete(1).catch(e => expect(e).toBeInstanceOf(Error));
		});

		it("should delete layer", async () => {
			jest.spyOn(mockRepository, "getById").mockReturnValueOnce(Promise.resolve(mockEntityModel as LayerEntityModel));
			jest.spyOn(mockRepository, "delete").mockReturnValueOnce(Promise.resolve(mockEntityModel as LayerEntityModel));

			const result = await layerEntity.delete(1);

			expect(result).toEqual(mockEntityModel);
		});
	});
});
