import { databaseHelperReportGeoserver, reportGeoserverFacade } from "@/application/factories";
import { MockReportGeoserverRepository } from "@/application/framework";
import { LayerEntityModel, StateControlEntityModel, StoreLayerEntityModel, WorkspaceEntityModel } from "@/domain/report-geoserver";

describe("reportGeoserverFacade", () => {
	const mockReportGeoserverRepository = new MockReportGeoserverRepository(databaseHelperReportGeoserver);

	beforeEach(async () => {
		await mockReportGeoserverRepository.createMocks();
	});

	afterEach(async () => {
		await mockReportGeoserverRepository.clearTables();
		await databaseHelperReportGeoserver.disconnect();
	});

	describe("createLayer", () => {
		it("should create a new layer", async () => {
			const idStore = 1;
			const idWorkspace = 1;
			const name = "Test Layer";
			const fileKey = "Test Layer";
			const type = "Test Type";
			const filePath = "/path/to";
			const geoserverResponseCode = 200;
			const status = true;
			const persistedInStoreAt = new Date();
			const sendToGeoserverAt = new Date();

			const result = await reportGeoserverFacade.createLayer({
				idStore,
				idWorkspace,
				fileKey,
				name,
				type,
				filePath,
				geoserverResponseCode,
				status,
				persistedInStoreAt,
				sendToGeoserverAt
			});

			expect(result).toBeInstanceOf(LayerEntityModel);
		});
	});

	describe("getLayerById", () => {
		it("should get layer by id", async () => {
			const id = 1;

			const result = await reportGeoserverFacade.getLayerById(id);

			expect(result).toBeInstanceOf(LayerEntityModel);
		});
	});

	describe("getLayerByName", () => {
		it("should get layer by name", async () => {
			const name = "Layer 1";

			const result = await reportGeoserverFacade.getLayerByName(name);

			expect(result).toBeInstanceOf(LayerEntityModel);
		});
	});

	describe("getAllLayers", () => {
		it("should get all layers", async () => {
			const result = await reportGeoserverFacade.getAllLayers();

			expect(result).toBeInstanceOf(Array);
			expect(result.every((item) => item instanceof LayerEntityModel)).toBeTruthy();
		});
	});

	describe("updateLayer", () => {
		it("should update layer", async () => {
			const id = 1;
			const idStore = 1;
			const idWorkspace = 1;
			const name = "Test Layer";
			const fileKey = "Test Layer";
			const type = "Test Type";
			const filePath = "/path/to";
			const geoserverResponseCode = 200;
			const status = true;
			const persistedInStoreAt = new Date();
			const sendToGeoserverAt = new Date();

			const result = await reportGeoserverFacade.updateLayer({
				id,
				idStore,
				idWorkspace,
				fileKey,
				name,
				type,
				filePath,
				geoserverResponseCode,
				status,
				persistedInStoreAt,
				sendToGeoserverAt
			});

			expect(result).toBeInstanceOf(LayerEntityModel);
		});
	});

	describe("deleteLayer", () => {
		it("should delete layer", async () => {
			const id = 1;

			const result = await reportGeoserverFacade.deleteLayer(id);

			expect(result).toBeInstanceOf(LayerEntityModel);
		});
	});


	describe("createStoreLayer", () => {
		it("should create a new store layer", async () => {
			const idWorkspace = 1;
			const name = "New Store Layer";
			const description = "Description of new store layer";
			const type = "Type of new store layer";
			const endpoint = "/new/endpoint";
			const createdBy = 1;
	
			const result = await reportGeoserverFacade.createStoreLayer({
				idWorkspace,
				name,
				description,
				type,
				endpoint,
				createdBy
			});
	
			expect(result).toBeInstanceOf(StoreLayerEntityModel);
		});
	});
	
	describe("getStoreLayerById", () => {
		it("should get store layer by id", async () => {
			const storeLayerId = 1;
	
			const result = await reportGeoserverFacade.getStoreLayerById(storeLayerId);
	
			expect(result).toBeInstanceOf(StoreLayerEntityModel);
		});
	});
	
	describe("getStoreLayerByName", () => {
		it("should get store layer by name", async () => {
			const storeLayerName = "Store Layer 1";
	
			const result = await reportGeoserverFacade.getStoreLayerByName(storeLayerName);
	
			expect(result).toBeInstanceOf(StoreLayerEntityModel);
		});
	});
	
	describe("getAllStoreLayers", () => {
		it("should get all store layers", async () => {
			const result = await reportGeoserverFacade.getAllStoreLayers();
	
			expect(result).toBeInstanceOf(Array);
			expect(result.every((item) => item instanceof StoreLayerEntityModel)).toBeTruthy();
		});
	});
	
	describe("updateStoreLayer", () => {
		it("should update store layer", async () => {
			const id = 1;
			const idWorkspace = 1;
			const name = "Updated Store Layer";
			const description = "Updated description";
			const type = "Updated Type";
			const endpoint = "/updated/endpoint";
			const createdBy = 1;
	
			const result = await reportGeoserverFacade.updateStoreLayer({
				id,
				idWorkspace,
				name,
				description,
				type,
				endpoint,
				createdBy
			});
	
			expect(result).toBeInstanceOf(StoreLayerEntityModel);
		});
	});
	
	describe("deleteStoreLayer", () => {
		it("should delete store layer", async () => {
			const storeLayerId = 1;
	
			const result = await reportGeoserverFacade.deleteStoreLayer(storeLayerId);
	
			expect(result).toBeInstanceOf(StoreLayerEntityModel);
		});
	});
	

	describe("createWorkspace", () => {
		it("should create a new workspace", async () => {
			const name = "New Workspace";
			const description = "Description of new workspace";
	
			const result = await reportGeoserverFacade.createWorkspace({
				name,
				description
			});
	
			expect(result).toBeInstanceOf(WorkspaceEntityModel);
		});
	});
	
	describe("getWorkspaceById", () => {
		it("should get workspace by id", async () => {
			const workspaceId = 1;
	
			const result = await reportGeoserverFacade.getWorkspaceById(workspaceId);
	
			expect(result).toBeInstanceOf(WorkspaceEntityModel);
		});
	});
	
	describe("getWorkspaceByWorkspaceName", () => {
		it("should get workspace by name", async () => {
			const workspaceName = "Workspace A";
	
			const result = await reportGeoserverFacade.getWorkspaceByWorkspaceName(workspaceName);
	
			expect(result).toBeInstanceOf(WorkspaceEntityModel);
		});
	});
	
	describe("getAllWorkspaces", () => {
		it("should get all workspaces", async () => {
			const result = await reportGeoserverFacade.getAllWorkspaces();
	
			expect(result).toBeInstanceOf(Array);
			expect(result.every((item) => item instanceof WorkspaceEntityModel)).toBeTruthy();
		});
	});
	
	describe("updateWorkspace", () => {
		it("should update workspace", async () => {
			const id = 1;
			const name = "Updated Workspace";
			const description = "Updated description";
	
			const result = await reportGeoserverFacade.updateWorkspace({
				id,
				name,
				description
			});
	
			expect(result).toBeInstanceOf(WorkspaceEntityModel);
		});
	});
	
	describe("deleteWorkspace", () => {
		it("should delete workspace", async () => {
			const workspaceId = 1;
	
			const result = await reportGeoserverFacade.deleteWorkspace(workspaceId);
	
			expect(result).toBeInstanceOf(WorkspaceEntityModel);
		});
	});
	

	describe("createStateControl", () => {
		it("should create a new state control", async () => {
			const id = "81f3ae8c-f92e-4415-a093-c44728083920";
			const workspaceStatus = "active";
			const storeStatus = "inactive";
			const layerStatus = "active";
			const stack = "test";
	
			const result = await reportGeoserverFacade.createStateControl({
				id,
				workspaceStatus,
				storeStatus,
				layerStatus,
				stack
			});
	
			expect(result).toBeInstanceOf(StateControlEntityModel);
		});
	});
	
	describe("getStateControlById", () => {
		it("should get state control by id", async () => {
			const stateControlId = "81f3ae8c-f92e-4415-a093-c44728083921";
	
			const result = await reportGeoserverFacade.getStateControlById(stateControlId);
	
			expect(result).toBeInstanceOf(StateControlEntityModel);
		});
	});
	
	describe("getAllStateControls", () => {
		it("should get all state controls", async () => {
			const result = await reportGeoserverFacade.getAllStateControls();
	
			expect(result).toBeInstanceOf(Array);
			expect(result.every((item) => item instanceof StateControlEntityModel)).toBeTruthy();
		});
	});
	
	describe("updateStateControl", () => {
		it("should update state control", async () => {
			const id = "81f3ae8c-f92e-4415-a093-c44728083921";
			const workspaceStatus = "inactive";
			const storeStatus = "active";
			const layerStatus = "inactive";
			const stack = "updated test";
	
			const result = await reportGeoserverFacade.updateStateControl({
				id,
				workspaceStatus,
				storeStatus,
				layerStatus,
				stack
			});
	
			expect(result).toBeInstanceOf(StateControlEntityModel);
		});
	});
	
	describe("deleteStateControl", () => {
		it("should delete state control", async () => {
			const stateControlId = "81f3ae8c-f92e-4415-a093-c44728083921";
	
			const result = await reportGeoserverFacade.deleteStateControl(stateControlId);
	
			expect(result).toBeInstanceOf(StateControlEntityModel);
		});
	});
});
