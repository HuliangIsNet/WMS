var url = "http://localhost:9901/api/";
layui.define(function (exports) {
    "use strict";
    /**
 * 常用封装 ?
 * */
    var MOD_NAME = 'apis';
    var api = {
        //#region 登录
        Login: url + 'User/Login',
        //#endregion
        //region 首页
        GetHomeInfo: url + 'Home/GetHomeInfo',

        GetBillDataForChart: url + 'Home/GetBillDataForChart',
        GetNearExpiredProduct: url + 'Home/GetNearExpiredProduct',
        GetSafeWarning: url + 'Home/GetSafeWarning',
        GetAllBills: url + 'Home/GetAllBills',



        //#endregion

        //#region  preview
        GetMessage: url + 'Home/GetMessage',
        GetOut_InPutMessage: url + 'Home/GetOut_InPutMessage',
        GetOperationDetails:url+'Home/GetOperationDetails',
        GetUseMessage:url+'Home/GetUseMessage',
        GetBillDataForChartByType:url+'Home/GetBillDataForChartByType',
        GetUsedSpaceForChart:url+'Home/GetUsedSpaceForChart',
        //#endregion

        //#region  用户
        UserAdd: url + 'User/Add', //添加用户
        UserAddWithRole: url + 'User/InsertUser', //添加用户
        UserUpdate: url + 'User/Update', //更新用户
        UserUpdateWidthRole: url + 'User/UpdateUser', //更新用户
        UserDelete: url + 'User/Delete', //删除用户
        UserGetModel: url + 'User/GetModel', //获取用户
        UserGetRoleModel: url + 'User/GetUserRoleModel', //获取用户角色
        UserLogin: url + 'User/Login', //用户登录
        UserLoginWeb: url + 'User/LoginWeb', //用户登录
        UserGetPageList: url + 'User/GetPageList', //用户列表
        GetUserList: url + 'User/GetList',
        UserGetUserAndRolePageList: url + 'User/GetUserAndRolePageList', //用户角色分页列表
        //#endregion
        GetLog: url + 'SystemLogControler/GetLogList',
        //#region  菜单
        MenuGetModel: url + 'Menu/GetModel',//web根据用户id获取对应菜单列表,转义为layui菜单树所用格式了
        MenuAddModel: url + 'Menu/Add',
        MenuUpdateModel: url + 'Menu/Update',
        MenuGetMenuListByUserId: url + 'Menu/GetMenuListByUserId',//web根据用户id获取对应菜单列表,转义为layui菜单树所用格式了
        MenuGetMenuListByUserIdAndClientType: url + 'Menu/GetMenuListByUserIdAndClientType',//根据用户id获取对应菜单列表
        MenuGetMenuListByRoleId: url + 'Menu/GetList',//根据角色id获取对应菜单列表
        MenuDelete: url + 'Menu/Delete', //删除
        //#endregion

        //#region  角色   
        RoleAddOrUpdate: url + 'Role/AddOrUpdate',
        RoleDelete: url + 'Role/Delete',
        RoleGetModel: url + 'Role/GetModel',
        RoleUpdateState: url + 'Role/UpdateState',
        RoleGetPageList: url + 'Role/GetPageList',
        RoleList: url + 'Role/GetList',
        //#endregion



        //#region  枚举字典
        GetContainerType: url + 'Enum/GetContainerType',
        GetContainerRunMode: url + 'Enum/GetContainerRunMode',
        GetState: url + 'Enum/GetState',
        GetStatus: url + 'Enum/GetStatus',
        GetStockType: url + 'Enum/GetStockType',
        GetTakeType: url + 'Enum/GetTakeType',
        GetTakeMode: url + 'Enum/GetTakeMode',
        GetTakeStatus: url + 'Enum/GetTakeStatus',
        GetLogType:url+'Enum/GetLogType',
        //#endregion

        //#region  货柜
        //货柜列表
        GetContainerPageList: url + "Container/GetPageList",
        //货柜列表
        GetContainerList: url + 'Container/GetList',
        //更新货柜状态
        UpdateContainerState: url + "Container/UpdateContainerState",
        //更新货柜运行状态
        UpdateContainerRun: url + "Container/UpdateContainerRun",
        //校验货柜名称
        CheckContainerName: url + "Container/CheckContainerName",
        //添加货柜
        AddContainer: url + 'container/AddContainer',
        //获取到货柜信息
        GetContainer: url + 'container/GetContainer',
        //删除货柜
        DeleteContainer: url + 'container/DeleteContainer',
        //更新
        UpdateContainer: url + 'container/UpdateContainer',
        //#endregion
        //#region 
        //获取到料斗集 ?
        GetHopperPageList: url + 'Hopper/GetPageList',
        GetHopperList: url + 'Hopper/GetList',
        //获取到料斗信 ?
        GetHopperModel: url + 'Hopper/GetModel',
        AddHopper: url + 'Hopper/Add',
        //更新料斗信息
        UpdateHopper: url + 'Hopper/Update',
        //校验料斗名称
        CheckHopperName: url + 'Hopper/CheckHopperName',

        //#region 
        //获取物料集合
        GetMaterialPageList: url + 'Material/GetPageList',
        //获取到物料集 ?
        GetMaterialList: url + 'Material/GetList',
        //获取物料信息
        GetMaterialModel: url + 'Material/GetModel',
        //校验物料信息
        CheckMaterial: url + 'Material/CheckMaterial',
        //校验物料条码
        CheckMaterialBarCode: url + 'Material/CheckMaterialBarCode',
        //添加物料
        AddMaterial: url + 'Material/Add',
        //删除物料
        DeleteMaterial: url + 'Material/Delete',
        //更新物料
        UpdateMaterial: url + 'Material/Update',
        //导入物料
        ImportMaterial: url + 'Material/Import',


        //#region  料盒类型
        GetTrayTypePageList: url + 'TrayType/GetPageList',
        GetTrayTypeList: url + 'TrayType/GetList',
        CheckTrayTypeName: url + 'TrayType/CheckTrayTypeName',
        GetTrayTypeModel: url + 'TrayType/GetModel',
        AddTrayType: url + 'TrayType/Add',
        DeleteTrayType: url + 'TrayType/Delete',
        UpdateTrayType: url + 'TrayType/Update',
        //#endregion

        //#region  料盒
        GetTrayPageList: url + 'Tray/GetPageList',
        GetTrayList: url + 'Tray/GetList',
        CheckTrayName: url + 'Tray/CheckTrayName',
        GetTrayModel: url + 'Tray/GetModel',
        AddTray: url + 'Tray/AddTray',
        DeleteTray: url + 'Tray/Delete',
        UpdateTray: url + 'Tray/Update',
        //#endregion



        //#region 产品
        //GetProductTree: '../../admin/data/organizationtree.json',
        GetProductTree: url + 'Product/GetProductTree',
        //GetProductBom: url + 'Material/GetListForMes',
        GetProductBom: url + 'Product/GetProductBom',
        GetProductList: url + 'Product/GetProductList',
        GetProductPageList: url + 'Product/GetPageList',

        AddProductAndBom: url + 'Product/AddProductAndBom',
        DeleteProductAndBom: url + 'Product/DeleteProductAndBom',
        UpdateProductAndBom: url + 'Product/UpdateProductAndBom',
        GetProductAndBomById: url + 'product/GetProductAndBomById',
        GetProductAndBomDto: url + 'product/GetProductAndBomDto',
        //#endregion
        //#region 产品编号回填
        GetHistoryProductNo: url + 'BackMesProductNo/GetHistoryProductNo',
        UpdateProductNo: url + 'BackMesProductNo/UpdateProductNo',
        UpdateProductCode: url + 'Bills/UpdateProductCode',
        //#endregion


        //#region   布局
        InsertLayouts: url + 'Layout/InsertLayouts',
        UpdateLayouts: url + 'Layout/UpdateLayouts',
        DeleteLayouts: url + 'Layout/DeleteLayouts',
        GetLayoutPageList: url + 'Layout/GetPageList',
        GetLayoutList: url + 'Layout/GetList',
        GetLayoutModel: url + 'Layout/GetLayoutModel',
        CheckLayoutName: url + 'Layout/CheckLayoutName',
        UpdateLayoutDefault: url + 'Layout/UpdateLayoutDefault',

        GetLayoutDetialByHopperId: url + 'Layout/GetLayoutDetialByHopperId',

        //#endregion

        //#region 入库
        AddBill: url + 'Bill/AddBillFromWeb',
        PublishBill: url + 'Bill/PublishBill',
        //AddBill_In:url+'Mes/AddInStockBill',
        GetBillPageList: url + 'Bill/GetPageList',
        GetBillSplitPageList: url + 'Bill/GetBillSplitPageList',
        DeleteBills: url + 'Bill/DeleteBill',
        PrintLabel: url + 'Bill/Print',

        GetBillsById: url + 'Bill/GetBillsById',
        //#endregion

        //#region 出库
        GetInventoryDetailList: url + 'Inventory/GetInventoryDetailList',
        AddBill_Out: url + 'Bill/AddBill_Out',
        GetBillsPageList_Out: url + 'Bill/GetPageList_Out',
        GetBillDetailToBatchCode: url + 'Bill/GetBillDetailToBatchCode',
        OutSplitByBatchCode: url + 'Bill/OutSplitByBatchCode',
        //#endregion

        GetBillExecState: url + 'Bill/GetBillExecState',
        ExecFinish: url + 'Bill/ExecFinish',
        //#region  库存
        GetProductInventoryList: url + 'Inventory/GetList',
        GetMaterialInventoryList: url + 'Inventory/GetDetailList',
        GetMaterialInventory: url + 'Inventory/GetMaterialInventory',
        GetListByTrayId: url + 'MaterialInventory/GetListByTrayId',
        GetMaterialBatchCode: url + 'MaterialInventory/GetMaterialBatchCode',
        //#endregion


        //#region Mes
        //GetProductTree: '../../admin/data/organizationtree.json',
        GetProductTree: url + 'Product/GetProductTree',
        //GetProductBom: url + 'Material/GetListForMes',
        GetProductBom: url + 'Product/GetProductBom',
        GetProductList: url + 'Product/GetList',
        GetProductPageList: url + 'Product/GetPageList',

        AddProductAndBom: url + 'Product/AddProductAndBom',
        DeleteProductAndBom: url + 'Product/DeleteProductAndBom',
        UpdateProductAndBom: url + 'Product/UpdateProductAndBom',
        GetProductAndBom: url + 'Product/GetProductAndBom',
        GetAllProduct: url + 'Product/GetAllProduct',
        //#endregion


        //#region  盘点
        GetTakeStockPageList: url + 'TakeStock/GetTakeStockDtoPageList',
        GetTakeStockInfoList: url + 'TakeStock/GetTakeStockInfo',
        AddTakeStock: url + 'TakeStock/Add',
        DeleteTakeStock: url + 'TakeStock/Delete',
        //#endregion

        //#region 工作台
        GetWorkBenchPageList: url + 'WorkBench/GetPageList',
        GetWorkBenchList: url + 'WorkBench/GetList',
        GetWorkBench: url + 'WorkBench/GetModel',
        AddWorkBench: url + 'WorkBench/Add',
        UpdateWorkBench: url + 'WorkBench/Update',
        DeleteWorkBench: url + 'WorkBench/Delete',
        CheckWorkBenchCode: url + 'WorkBench/CheckWorkBenchCode',
        CheckWorkBenchName: url + 'WorkBench/CheckWorkBenchName',
        //#endregion


        //#region 存储设置
        GetStoreSettingList: url + 'StoreSetting/GetPageList',
        GetStoreSetting: url + 'StoreSetting/GetModel',
        AddStoreSetting: url + 'StoreSetting/Add',
        UpdateStoreSetting: url + 'StoreSetting/Update',
        DeleteStoreSetting: url + 'StoreSetting/Delete',
        //#endregion


        //#region log
        GetLogList:url+'Log/GetPageList',
        //#endregion

        //#region 货柜功能配置
        GetContainerFunctionModuleList:url+'ContainerFunctionModule/GetList',
        AddContainerFunctionModule:url+'ContainerFunctionModule/AddContainerFunctionModule',
        DeleteContainerFunctionModule:url+'ContainerFunctionModule/DeleteEntityByIds',
        //#endregion

        //#region 货柜参数设置
        GetParameter: url + 'Parameter/GetParameter',
        GetParameterList: url + 'Parameter/GetParameterList',
        //#endregion
    };
    exports(MOD_NAME, api);
});