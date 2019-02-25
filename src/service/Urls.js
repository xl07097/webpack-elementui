let urls = {};
//
let protocol = window.location.protocol;
let host = '';//window.location.host;
if (window.location.hostname === 'localhost') {//本地开发环境
    // host = '192.168.1.60:8080';
    host = '192.1.6.230:8080';
} else {
    host = window.location.hostname + ':8080';
}
host += '/EduPhyHea';
// base Url 前端API调用地址
urls.baseApi = protocol + '//' + host;

urls.login='SysUser/LoginUser';//登录

// 下拉列表
urls.unit_opt_list = '/UnitInf/GetUnitInfAllListByType';// 1教育局2学校3医院4体科所
urls.area_list = '/Area/GetAreadatalist'; // 区域下拉列表
urls.grade_list = '/UnitInf/GetGradesByUnitId'; // 根据学校获取年级下拉列表 // id="2"
urls.grade_all_list = '/SysDictionaryCategory/GetDictionaryByCategoryId'; // 所有年级下拉列表
urls.class_all_list = '/Classno/GetClassAllList'; // 根据 学校id，年级id获取对应班级
urls.unit_all_list = '/UnitInf/GetUnitInfAllList'; //单位列表
urls.section_all_list = '/HospitalDep/GetHosDepListByUnitId'; // 根据医院id获取对应科室

//公共
urls.examination_itembytype='PhysicalType/GetPhysicalListBytype';//根据体检类型获取选中的项目


//用户信息列表
urls.user_list='/SysUser/GetUserList';//字典表类别列表


//字典表类别管理
urls.dic_type='/SysDictionaryCategory/SysDictionaryCategorydatalist';//字典表类别列表


// 单位信息管理 // 页面拆分成医疗机构和学校
urls.unit_tree = '/UnitInf/GetUnitTreesByKeyWord'; //左侧树
urls.unit_page_list = '/UnitInf/GetUnitInfList'; // 列表
urls.unit_add = '/UnitInf/AddUnitInf'; // 新增
urls.unit_edit = '/UnitInf/UpdateUnitInf'; //编辑
urls.unit_status = '/UnitInf/OperaUnitInf'; // 启用。禁用
urls.unit_info = '/UnitInf/GetUnitInfById'; // 详情

// 医疗机构或学校
urls.dept_list = '/SysDepartment/GetList';
urls.dept_add = '/SysDepartment/Add';
urls.dept_edit = '/SysDepartment/Update';
urls.dept_status = '/SysDepartment/Operation';
urls.dept_info = '/SysDepartment/GetById';
urls.dept_all_list = '/SysDepartment/GetAll';

// 班级信息管理
urls.class_list = '/Classno/GetClassList'; // 列表
urls.class_add = '/Classno/AddClassno'; // 新增
urls.class_edit = '/Classno/UpdateClassno'; //编辑
urls.class_status = '/Classno/OperaClassno'; // 启用。禁用
urls.class_info = '/Classno/GetClassnoById'; // 详情

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

// 老师
urls.school_all_list = '/SysDepartment/GetAll'; // 所有学校下拉列表
urls.teacher_lists = '/Teacher/GetList';
urls.teacher_add = '/Teacher/Add';

// 学生信息管理
urls.student_list = '/StudentInf/GetStudentInfList'; // 列表
urls.student_add = '/StudentInf/AddStudentInf'; // 新增
urls.student_edit = '/StudentInf/UpdateStudentInf'; //编辑
urls.student_status = '/StudentInf/OperaStudentInf'; // 启用。禁用
urls.student_info = '/StudentInf/GetStudentInfById'; // 详情
urls.get_student_count = '/StudentInf/GetClassTotalByClassId'; // 详情

//统一体检

//设定体检对象
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
urls.examination_config_list='/PhysicalLimit/GetPhysicalLimitListBySetId'; //参考值列表
urls.examination_config_add='/PhysicalLimit/OperaNormalPhysicalLimit';//正常值新增
urls.examination_retest_add='/PhysicalLimit/OperaAbNormalPhysicalLimit';//复测值新增
//体检项目规划
urls.examination_plan_list='/PhysicalType/GetCheckedPhysicalTypeList';//选中列表
urls.examination_plan_check='/PhysicalType/AddPhysicalTypeList';//选中
//体检队伍
urls.examination_team_list='/PhysicalTeam/GetPhysicalTeamList';//列表
urls.examination_team_status ='/PhysicalTeam/OperaPhysicalTeam'; //启用禁用
urls.examination_team_add='/PhysicalTeam/AddPhysicalTeamAndDetail';//新增
urls.examination_team_edit='/PhysicalTeam/UpdatePhysicalTeamAndDetail';//编辑
urls.examination_team_info='/PhysicalTeam/GetAllPhysicalTeamById';//详情
//体检报告
urls.examination_personsummary_list='/FinalResult/GetEleFinalResultList'; //个人体检报告列表
urls.examination_personsummary_analyze='/PhysicalCourse/GetReportByStudentId';//个人体检报告分析


//健康体测
//体测项目规划
urls.getProPlan_list='/ProjectProgram/GetProProgramList';//获取列表
urls.updateProPlan_list ='/ProjectProgram/UpdateProProgramList';//更新一条

//健康体测-体侧报告-电子体测报告
urls.elecPhysicalReport_list='/FitnessCourse/GetReportFormsList';//列表
urls.elecPhysicalReport_analyze='/FitnessCourse/GetReportForms';//分析和详情

//健康体测 体测项目参考值
urls.elecPhysical_Para_list='/FitnessTestSet/GetAllSet';//体测项目参考值列表
urls.elecPhysical_Para_info='/ParamConfig/GetParamConfigBySetId';//详情
urls.elecPhysical_Para_edit='/ParamConfig/UpdateParamConfig';//修改


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
urls.area_report_list= '/FitnessCourse/GetAreaFitnessCourseTotal';//区域汇总报告单
export default urls;
