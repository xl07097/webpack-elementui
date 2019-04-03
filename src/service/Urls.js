let urls = {};
//
let protocol = window.location.protocol;
let host = '';//window.location.host;
if (window.location.hostname === 'localhost') {//本地开发环境
    // host = '192.168.1.54:8080';
    host = '192.1.6.230:8080';
} else {
    host = window.location.hostname + ':8080';
}
host += '/EduPhyHea';
// base Url 前端API调用地址
urls.baseApi = protocol + '//' + host;

urls.login = '/SysUser/Login';//登录
urls.getMenuPermision = '/SysFunction/GetFunctionByLogin'; // 获取权限路由

// 模板下载地址
urls.teacher_down = urls.baseApi + '/static/老师信息导入模板.xlsx';
urls.student_down = urls.baseApi + '/static/学生名单导入模板.xlsx';
urls.student_info_down = urls.baseApi + '/static/学生信息导入模板.xlsx';
urls.class_down = urls.baseApi + '/static/班级信息导入模板.xlsx';

// 导入
urls.teacher_up = urls.baseApi + '/Teacher/ImportExcel';


// 下拉列表
urls.unit_opt_list = '/UnitInf/GetUnitInfAllListByType';// 1教育局2学校3医院4体科所
urls.grade_list = '/UnitInf/GetGradesByUnitId'; // 根据学校获取年级下拉列表 // id="2"
urls.grade_all_list = '/SysDictionaryCategory/GetDictionaryByCategoryId'; // 所有年级下拉列表
urls.class_all_list = '/Classno/GetClassAllList'; // 根据 学校id，年级id获取对应班级
urls.unit_all_list = '/UnitInf/GetUnitInfAllList'; //单位列表
urls.section_all_list = '/HospitalDep/GetHosDepListByUnitId'; // 根据医院id获取对应科室

//公共
urls.examination_itembytype = 'PhysicalType/GetPhysicalListBytype';//根据体检类型获取选中的项目


// 上传图片
urls.uploadImage = urls.baseApi + '/FileUpload/fileUpload';

//用户信息
urls.user_list = '/SysUser/GetList';//列表
urls.user_edit = '/SysUser/Update';//修改
urls.user_add = '/SysUser/Add';//新增
urls.user_all = '/SysUser/GetAll';//获取所有
urls.user_update = '/SysUser/Update';//修改
urls.user_status = '/SysUser/Operation';//状态
urls.user_info = '/SysUser/GetById';//根据id获取某一个
urls.user_reset = '/SysUser/ResetPassord';//重置密码
urls.user_dept = '/SysDepartment/GetAll';//获取部门
urls.manage_list = '/Taskmanagement/GetTaskManageAll';//获取任务
// 区域
urls.area_list = '/Area/GetList';
urls.area_add = '/Area/Add';
urls.area_status = '/Area/Operation';
urls.area_edit = '/Area/Update';
urls.area_info = '/Area/GetById';
urls.area_all_list = '/Area/GetAll';


//角色信息
urls.role_list = '/SysRole/GetList';//列表
urls.role_all = '/SysRole/GetAll';//获取角色下拉列表
urls.role_add = '/SysRole/Add';//新增
urls.role_edit = '/SysRole/Update';//编辑
urls.role_operation = '/SysRole/Operation';//状态
urls.role_function = '/SysFunction/GetList';//获取菜单普通下拉列表
urls.function_all = '/SysFunction/GetAll';//配置权限
urls.add_role_function = '/SysRoleFunction/AddRoleFunction';//
urls.getFunction = '/SysRole/GetFunctions';//配置权限

//字典表类别管理
urls.dic_type = '/DictionaryCategory/GetList';//字典表类别列表
urls.dic_add = '/DictionaryCategory/Add';//新增
urls.dic_update = '/DictionaryCategory/Update';//修改
urls.dic_status = '/DictionaryCategory/Operation';//状态
urls.dic_all = '/DictionaryCategory/GetAll';//所有

//字典表信息管理
urls.dictionary_info = '/Dictionary/GetList';//字典表信息列表
urls.dictionary_add = '/Dictionary/Add';//新增
urls.dictionary_edit = '/Dictionary/Update';//修改
urls.dictionary_status = '/Dictionary/Operation';//状态
urls.dictionary_id = '/Dictionary/GetById';//状态
urls.dictionary_tree = '/Dictionary/GetTreeAll';//树

//通知管理
urls.task_list = '/Taskmanagement/GetList';//通知管理列表
urls.task_add = '/Taskmanagement/Add';//新增
urls.task_operation = '/Taskmanagement/Operation';//操作

//字典值
urls.dictm_all_list = '/Dictionary/GetAll';

//日志
urls.system_log = '/SysLog/GetList';
urls.system_info = '/SysLog/GetById';

// // 单位信息管理 // 页面拆分成医疗机构和学校
// urls.unit_tree = '/UnitInf/GetUnitTreesByKeyWord'; //左侧树
// urls.unit_page_list = '/UnitInf/GetUnitInfList'; // 列表
// urls.unit_add = '/UnitInf/AddUnitInf'; // 新增
// urls.unit_edit = '/UnitInf/UpdateUnitInf'; //编辑
// urls.unit_status = '/UnitInf/OperaUnitInf'; // 启用。禁用
// urls.unit_info = '/UnitInf/GetUnitInfById'; // 详情

// 医疗机构或学校
urls.dept_list = '/SysDepartment/GetList';
urls.dept_add = '/SysDepartment/Add';
urls.dept_edit = '/SysDepartment/Update';
urls.dept_status = '/SysDepartment/Operation';
urls.dept_info = '/SysDepartment/GetById';
urls.dept_all_list = '/SysDepartment/GetAll';

// 班级信息管理
urls.class_list = '/ClassManagement/GetList'; // 列表
urls.class_add = '/ClassManagement/Add'; // 新增
urls.class_edit = '/ClassManagement/Update'; //编辑
urls.class_status = '/ClassManagement/Operation'; // 启用。禁用
urls.class_info = '/ClassManagement/GetById'; // 详情
urls.class_all_lists = '/ClassManagement/GetAll';
urls.class_import = '/ClassManagement/ImportExce'; // 导入

// 科室信息管理
urls.section_list = '/HospitalDep/GetList'; // 列表
urls.section_add = '/HospitalDep/Add'; // 新增
urls.section_edit = '/HospitalDep/Update'; //编辑
urls.section_status = '/HospitalDep/Operation'; // 启用。禁用
urls.section_info = '/HospitalDep/GetById'; // 详情
urls.section_all_lists = '/HospitalDep/GetAll';

//医生
urls.doctor_list = '/Doctor/GetList';
urls.doctor_add = '/Doctor/Add';
urls.doctor_edit = '/Doctor/Update';
urls.doctor_status = '/Doctor/Operation';
urls.doctor_info = '/Doctor/GetById';
// urls.doctor_all_list = '/Doctor/GetById';

// 工作人员管理
urls.staff_list = '/Employee/GetEmployeeList'; // 列表
urls.staff_add = '/Employee/AddEmployee'; // 新增
urls.staff_edit = '/Employee/UpdateEmployee'; //编辑
urls.staff_status = '/Employee/OperaEmployee'; // 启用。禁用
urls.staff_info = '/Employee/GetEmployeeById'; // 详情
urls.teacher_list = '/Employee/GetEmpListByType'; //  医生/教师列表 2:教师,3:医生

// 1老师2体育老师3校医
urls.teacher_lists = '/Teacher/GetList';
urls.teacher_add = '/Teacher/Add';
urls.teacher_edit = '/Teacher/Update';
urls.teacher_status = '/Teacher/Operation';
urls.teacher_info = '/Teacher/GetById';
urls.teacher_all_list = '/Teacher/GetAll';

// 学生信息管理
urls.student_list = '/StudentInfo/GetList'; // 列表
urls.student_add = '/StudentInfo/Add'; // 新增
urls.student_edit = '/StudentInfo/Update'; //编辑
urls.student_status = '/StudentInfo/Operation'; // 启用。禁用
urls.student_info = '/StudentInfo/GetById'; // 详情
// urls.get_student_count = '/StudentInf/GetClassTotalByClassId';
urls.student_import = urls.baseApi + '/StudentInfo/ImportExcel';

//统一体检
//学生体检名单校对
urls.proofreading_list = '/StudentListAnamnesis/GetList';//列表
urls.proofreading_add = '/StudentListAnamnesis/Add';//新增
urls.proofreading_update = '/StudentListAnamnesis/Update';//编辑
urls.proofreading_info = '/StudentListAnamnesis/GetById'; //详情
urls.proofreading_status = '/StudentListAnamnesis/Operation'; // 启用/禁用。删除

// 学生上报列表 班级人数审核
urls.student_bao_list = '/StudentListAnamnesis/GetStuAmountList'; //
urls.student_bao_add = '/CheckClassCount/AddAll'; // 上报
urls.class_check = '/CheckClassCount/GetClassNo'; //上报班级列表
urls.class_check_list = '/CheckClassCount/GetAll';
urls.student_check_import = urls.baseApi + '/StudentListAnamnesis/ImportExcel';

//==========体检计划
urls.media_list = '/MedicalPlan/GetList';
urls.media_add = '/MedicalPlan/Add';
urls.media_edit = '/MedicalPlan/Update';
urls.media_status = '/MedicalPlan/Operation';
urls.media_info = '/MedicalPlan/GetById';
urls.media_plan = '/MedicalPlan/SchedulePlan';

urls.set_objects_list = '/PhysicalPlan/GetPhysicalPlanList';//列表
urls.add_object = '/PhysicalPlan/AddPhysicalPlan';          //新增
urls.edit_object = '/PhysicalPlan/UpdatePhysicalPlan';      //编辑
urls.object_detail = '/PhysicalPlan/GetPhysicalPlanById';   //详情
urls.object_opera = '/PhysicalPlan/OperaPhysicalPlan';      //启用/禁用

//体检排程
urls.schedule_list = '/PhysicalPlan/GetArrangePlandatalist';//列表
urls.schedule_detail = '/PhysicalPlan/GetPhysicalPlanById'; //详情
urls.schedule_req = '/PhysicalPlan/ArrangePhysicalPlan'; //排程

//体检准备
urls.examination_config_list = '/PhysicalLimit/GetPhysicalLimitListBySetId'; //参考值列表
urls.examination_config_add = '/PhysicalLimit/OperaNormalPhysicalLimit';//正常值新增
urls.examination_retest_add = '/PhysicalLimit/OperaAbNormalPhysicalLimit';//复测值新增

//体检项目规划
urls.examination_plan_list = '/PhysicalType/GetCheckedPhysicalTypeList';//选中列表
urls.examination_plan_check = '/PhysicalType/AddPhysicalTypeList';//选中
urls.medicaltype_list = '/MedicalType/GetList';
urls.medicaltype_add = '/MedicalType/Add';
urls.medicaltype_edit = '/MedicalType/UpdateMedicalType';
urls.medicaltype_status = '/MedicalType/Operation';
urls.medicaltype_info = '/MedicalType/GetById';
urls.medicaltype_tree = '/MedicalType/GetMedicalTypeTree';


//体检队伍
urls.examination_team_list = '/PhysicalTeam/GetPhysicalTeamList';//列表
urls.examination_team_status = '/PhysicalTeam/OperaPhysicalTeam'; //启用禁用
urls.examination_team_add = '/PhysicalTeam/AddPhysicalTeamAndDetail';//新增
urls.examination_team_edit = '/PhysicalTeam/UpdatePhysicalTeamAndDetail';//编辑
urls.examination_team_info = '/PhysicalTeam/GetAllPhysicalTeamById';//详情

//体检报告
urls.examination_personsummary_list = '/FinalResult/GetEleFinalResultList'; //个人体检报告列表
urls.examination_personsummary_analyze = '/PhysicalCourse/GetReportByStudentId';//个人体检报告分析

// 电子体检报告
urls.elec_list = '/UserResult/GetMedicalList';
urls.elec_get_one = '/UserResult/GetSingleMedical';


//健康体测
//体测项目规划
urls.getProPlan_list = '/ProjectProgram/GetProProgramList';//获取列表
urls.updateProPlan_list = '/ProjectProgram/UpdateProProgramList';//更新一条

//健康体测-体侧报告-电子体测报告
urls.elecPhysicalReport_list = '/FitnessCourse/GetReportFormsList';//列表
urls.elecPhysicalReport_analyze = '/FitnessCourse/GetReportForms';//分析和详情

//健康体测 体测项目参考值
urls.elecPhysical_Para_list = '/FitnessTestSet/GetAllSet';//体测项目参考值列表
urls.elecPhysical_Para_info = '/ParamConfig/GetParamConfigBySetId';//详情
urls.elecPhysical_Para_edit = '/ParamConfig/UpdateParamConfig';//修改
urls.elecPhysical_Para_byid = '/ParamConfig/GetParamConfigInfoById';

//体测计划规划
urls.add_physical_object = '/FitnessPlan/AddFitnessPlan'; // 新增体侧对象
urls.get_physical_object = '/FitnessPlan/GetFitnessPlanById'; // 获取体侧对象详情
urls.get_physical_object_list = '/FitnessPlan/GetFitnessPlanList'; // 获取体侧设置对象列表
urls.edit_physical_object = '/FitnessPlan/UpdateFitnessPlan'; // 编辑体侧对象
urls.status_physical_object = '/FitnessPlan/OperaFitnessPlan'; // 禁用启用体侧对象
urls.time_physical_object = '/FitnessPlan/ArrangeFitnessPlan'; // 排程时间
urls.plan_physical_list = '/FitnessPlan/GetPlanArrDatalist'; // 排程列表
urls.app_physical = 'ApproveRecord/AddFitNessApproveRecord'; // 审核
urls.app_physical_list = 'ApproveRecord/GetFitNessApproveRecordList'; // 审核列表

// 体测统计汇总
urls.project_list = '/FitnessTestSet/GetAllSet';
urls.area_report_list = '/FitnessCourse/GetAreaFitnessCourseTotal';//区域汇总报告单
export default urls;
