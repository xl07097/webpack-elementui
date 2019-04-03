const routers = [{
        path: '/login',
        meta: {
            title: '登录'
        },
        component: (resolve) => require(['./views/login.vue'], resolve)
    },
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/index',
        meta: {
            title: '首页'
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    },
    {
        path: '/system',
        // name: 'system',
        meta: {
            title: '系统管理'
        },
        component: (resolve) => require(['./views/system/system.vue'], resolve),
        children: [{
                path: '/',
                name: 'system',
                meta: {
                    title: '系统管理首页'
                },
                component: (resolve) => require(['./views/system/systemIndex.vue'], resolve)
            },
            {
                path: 'user',
                name: 'user',
                meta: {
                    title: '用户管理'
                },
                component: (resolve) => require(['./views/system/user.vue'], resolve)
            },
            {
                path: 'role',
                name: 'role',
                meta: {
                    title: '角色管理'
                },
                component: (resolve) => require(['./views/system/role.vue'], resolve)
            },
            {
                path: 'functional',
                name: 'functional',
                meta: {
                    title: '功能管理'
                },
                component: (resolve) => require(['./views/system/functional.vue'], resolve)
            },
            {
                path: 'noticeManage',
                name: 'noticeManage',
                meta: {
                    title: '通知管理'
                },
                component: (resolve) => require(['./views/system/noticeManage.vue'], resolve)
            },
            {
                path: 'notice',
                name: 'notice',
                meta: {
                    title: '通知'
                },
                component: (resolve) => require(['./views/system/notice.vue'], resolve)
            },
            {
                path: 'dictionaryType',
                name: 'dictionaryType',
                meta: {
                    title: '字典表类别管理'
                },
                component: (resolve) => require(['./views/system/dictionaryType.vue'], resolve)
            },
            {
                path: 'dictionaryInfo',
                name: 'dictionaryInfo',
                meta: {
                    title: '字典信息管理'
                },
                component: (resolve) => require(['./views/system/dictionaryInfo.vue'], resolve)
            }
        ]
    },
    {
        path: '/medicalExamination',
        // name: 'medicalExamination',
        meta: {
            title: '统一体检'
        },
        component: (resolve) => require(['./views/medicalExamination/medicalExamination.vue'], resolve),
        children: [{
                path: '/',
                name: 'medicalExamination',
                meta: {
                    title: '体检项目首页'
                },
                component: (resolve) => require(['./views/medicalExamination/medicalIndex.vue'], resolve)
            },
            {
                path: 'proofreading',
                name: 'proofreading',
                meta: {
                    title: '学生体检名单校对'
                },
                component: (resolve) => require(['./views/medicalExamination/manualPlan/checkStudentlist/medicalHistory.vue'], resolve)
            },
            {
                path: 'examinationPlan',
                name: 'examinationPlan',
                meta: {
                    title: '体检项目规划'
                },
                component: (resolve) => require(['./views/medicalExamination/examinationPlan.vue'], resolve)
            },
            {
                path: 'examinationTeamConfig',
                name: 'examinationTeamConfig',
                meta: {
                    title: '设定体检计划'
                },
                component: (resolve) => require(['./views/medicalExamination/manualPlan/setObject/setObjects.vue'], resolve)
            },
            {
                path: 'setObjects',
                name: 'setObjects',
                meta: {
                    title: '设定体检对象'
                },
                component: (resolve) => require(['./views/medicalExamination/manualPlan/setObject/setObjects.vue'], resolve)
            },
            {
                path: 'schedule',
                name: 'schedule',
                meta: {
                    title: '体检排程'
                },
                component: (resolve) => require(['./views/medicalExamination/manualPlan/schedule/schedule.vue'], resolve)
            },
            {
                path: 'review',
                name: 'review',
                meta: {
                    title: '审核'
                },
                component: (resolve) => require(['./views/medicalExamination/manualPlan/planReview.vue'], resolve)
            },
            {
                path: 'summaryReport',
                name: 'summaryReport',
                meta: {
                    title: '学校汇总报告单'
                },
                component: (resolve) => require(['./views/medicalExamination/medicalReport/summaryReport.vue'], resolve)
            },
            {
                path: 'areaSummaryReport',
                name: 'areaSummaryReport',
                meta: {
                    title: '区域学校汇总报告单'
                },
                component: (resolve) => require(['./views/medicalExamination/medicalReport/areaSummaryReport.vue'], resolve)
            },
            {
                path: 'gradeSummaryReport',
                name: 'gradeSummaryReport',
                meta: {
                    title: '年级汇总报告单'
                },
                component: (resolve) => require(['./views/medicalExamination/medicalReport/gradeSummaryReport.vue'], resolve)
            },
            {
                path: 'classSummaryReport',
                name: 'classSummaryReport',
                meta: {
                    title: '班级汇总报告单'
                },
                component: (resolve) => require(['./views/medicalExamination/medicalReport/classSummaryReport.vue'], resolve)
            },
            {
                path: 'genderSummaryReport',
                name: 'genderSummaryReport',
                meta: {
                    title: '性别汇总报告单'
                },
                component: (resolve) => require(['./views/medicalExamination/medicalReport/genderSummaryReport.vue'], resolve)
            },
            {
                path: 'ageSummaryReport',
                name: 'ageSummaryReport',
                meta: {
                    title: '年龄汇总报告单'
                },
                component: (resolve) => require(['./views/medicalExamination/medicalReport/ageSummaryReport.vue'], resolve)
            },
            {
                path: 'projectSummaryReport',
                name: 'projectSummaryReport',
                meta: {
                    title: '体检项目报告单'
                },
                component: (resolve) => require(['./views/medicalExamination/medicalReport/projectSummaryReport.vue'], resolve)
            },
            {
                path: 'schoolImport',
                name: 'schoolImport',
                meta: {
                    title: '县市学校体检数据批量导入'
                },
                component: (resolve) => require(['./views/medicalExamination/medicalReport/schoolImport'], resolve)
            },
            {
                path: 'examImport',
                name: 'examImport',
                meta: {
                    title: '体检数据批量导出'
                },
                component: (resolve) => require(['./views/medicalExamination/medicalReport/examImport.vue'], resolve)
            },
            {
                path: 'personSummaryReport',
                name: 'personSummaryReport',
                meta: {
                    title: '电子体检报告'
                },
                component: (resolve) => require(['./views/medicalExamination/medicalReport/personSummaryReport.vue'], resolve)
            },
            {
                path: 'examResult',
                name: 'examResult',
                meta: {
                    title: '体检结果通知'
                },
                component: (resolve) => require(['./views/medicalExamination/medicalReport/examResult.vue'], resolve)
            },
            {
                path: 'templetSet',
                name: 'templetSet',
                meta: {
                    title: '上报体检数据模板设定'
                },
                component: (resolve) => require(['./views/medicalExamination/dataReport/templetSet.vue'], resolve)
            },
            {
                path: 'reTest',
                name: 'reTest',
                meta: {
                    title: '校医复测'
                },
                component: (resolve) => require(['./views/medicalExamination/medicalReport/reTest.vue'], resolve)
            }
        ]
    },
    {
        path: '/dataCenter',
        // name: 'dataCenter',
        meta: {
            title: '基础数据信息'
        },
        component: (resolve) => require(['./views/dataCenter/dataContent.vue'], resolve),
        children: [{
                path: '/',
                name: 'dataCenter',
                meta: {
                    title: '基础数据首页'
                },
                component: (resolve) => require(['./views/datacenter/dataIndex.vue'], resolve)
            },
            {
                path: 'unit',
                name: 'unit',
                meta: {
                    title: '医疗机构信息管理'
                },
                component: (resolve) => require(['./views/dataCenter/unit/unitList.vue'], resolve)
            },
            {
                path: 'schDocInfo',
                name: 'schDocInfo',
                meta: {
                    title: '校医信息管理'
                },
                component: (resolve) => require(['./views/dataCenter/schDocInfo/schDocList.vue'], resolve)
            },
            {
                path: 'schoolInfo',
                name: 'schoolInfo',
                meta: {
                    title: '学校信息管理'
                },
                component: (resolve) => require(['./views/dataCenter/schoolInfo/schoolList.vue'], resolve)
            },
            {
                path: 'teacherInfo',
                name: 'teacherInfo',
                meta: {
                    title: '老师信息管理'
                },
                component: (resolve) => require(['./views/dataCenter/teacherInfo/teacherList.vue'], resolve)
            },
            {
                path: 'classInfo',
                name: 'classInfo',
                meta: {
                    title: '班级信息管理'
                },
                component: (resolve) => require(['./views/dataCenter/classInfo/classList.vue'], resolve)
            },
            {
                path: 'sectionInfo',
                name: 'sectionInfo',
                meta: {
                    title: '科室信息管理'
                },
                component: (resolve) => require(['./views/dataCenter/sectionInfo/sectionList.vue'], resolve)
            },
            {
                path: 'doctorInfo',
                name: 'doctorInfo',
                meta: {
                    title: '医生信息管理'
                },
                component: (resolve) => require(['./views/dataCenter/doctorInfo/doctorList.vue'], resolve)
            },
            {
                path: 'staffInfo',
                name: 'staffInfo',
                meta: {
                    title: '工作人员管理'
                },
                component: (resolve) => require(['./views/dataCenter/temp/staffInfo/staffList.vue'], resolve)
            },
            {
                path: 'studentInfo',
                name: 'studentInfo',
                meta: {
                    title: '学生信息管理'
                },
                component: (resolve) => require(['./views/dataCenter/studentInfo/studentList.vue'], resolve)
            },
            {
                path: 'examinationItemConf',
                name: 'examinationItemConf',
                meta: {
                    title: '体检项目参数配置'
                },
                component: (resolve) => require(['./views/medicalExamination/examConfig/examinationItemConf.vue'], resolve)
            },
            {
                path: 'physicalParaConfig',
                name: 'physicalParaConfig',
                meta: {
                    title: '体测项目参数配置'
                },
                component: (resolve) => require(['./views/physicalFitnessTest/physicalParaConfig/physicalParaConfig.vue'], resolve)
            },
            {
                path: 'standardizedImport',
                name: 'standardizedImport',
                meta: {
                    title: '数据标准化导入'
                },
                component: (resolve) => require(['./views/dataCenter/standardizedImport/standardizedImport.vue'], resolve)
            },
            {
                path: 'standardizedOut',
                name: 'standardizedOut',
                meta: {
                    title: '数据标准化导入'
                },
                component: (resolve) => require(['./views/dataCenter/standardizedOut/standardizedOut.vue'], resolve)
            },
            {
                path: 'systemDialog',
                name: 'systemDialog',
                meta: {
                    title: '系统日志'
                },
                component: (resolve) => require(['./views/dataCenter/systemDialog/systemDialog.vue'], resolve)
            }
        ]
    },
    {
        path: '/physicalFitnessTest',
        // name: 'physicalFitnessTest',
        meta: {
            title: '健康体测'
        },
        component: (resolve) => require(['./views/physicalFitnessTest/physicalFitnessTest.vue'], resolve),
        children: [{
                path: '/',
                name: 'physicalFitnessTest',
                meta: {
                    title: '首页'
                },
                component: (resolve) => require(['./views/physicalFitnessTest/physicalFitnessIndex.vue'], resolve)
            },
            {
                path: '/physicalPrepare',
                name: 'physicalPrepare',
                meta: {
                    title: '体测准备'
                },
                component: (resolve) => require(['./views/physicalFitnessTest/physicalPrepare/physicalPrepare.vue'], resolve),
                children: [{
                        path: '/projectPlanNew',
                        name: 'projectPlanNew',
                        meta: {
                            title: '体测项目规划'
                        },
                        component: (resolve) => require(['./views/physicalFitnessTest/physicalPrepare/projectPlanNew.vue'], resolve)
                    },
                    {
                        path: '/physicalTestPlan',
                        name: 'physicalTestPlan',
                        meta: {
                            title: '体测计划规划（手动）'
                        },
                        component: (resolve) => require(['./views/physicalFitnessTest/physicalPrepare/physicalPrepare.vue'], resolve),
                        children: [{
                                path: 'physicaltestobject',
                                name: 'physicaltestobject',
                                meta: {
                                    title: '设定体测对象'
                                },
                                component: (resolve) => require(['./views/physicalFitnessTest/physicalPrepare/physicalTestPlan/physicalTestPlan.vue'], resolve)
                            },
                            {
                                path: 'physicalschedule',
                                name: 'physicalschedule',
                                meta: {
                                    title: '体测排程'
                                },
                                component: (resolve) => require(['./views/physicalFitnessTest/physicalPrepare/physicaltestSchedule/physicaltestSchedule.vue'], resolve)
                            },
                            {
                                path: 'physicalaudit',
                                name: 'physicalaudit',
                                meta: {
                                    title: '审核'
                                },
                                component: (resolve) => require(['./views/physicalFitnessTest/physicalPrepare/physicalTestAudit/physicalTestAudit.vue'], resolve)
                            },
                            {
                                path: '/elecPhysicalReport',
                                name: 'elecPhysicalReport',
                                meta: {
                                    title: '电子体测报告'
                                },
                                component: (resolve) => require(['./views/physicalFitnessTest/physicalReport/elecPhysicalReport.vue'], resolve)
                            },
                            {
                                path: '/physicalData',
                                name: 'physicalData',
                                meta: {
                                    title: '县市学校体测数据'
                                },
                                component: (resolve) => require(['./views/physicalFitnessTest/physicalReport/physicalData.vue'], resolve)
                            },
                            {
                                path: '/resultInform',
                                name: 'resultInform',
                                meta: {
                                    title: '体测结果通知'
                                },
                                component: (resolve) => require(['./views/physicalFitnessTest/physicalReport/resultInform.vue'], resolve)
                            },
                            {
                                path: '/resultSummarizing',
                                name: 'resultSummarizing',
                                meta: {
                                    title: '体测结果汇总'
                                },
                                component: (resolve) => require(['./views/physicalFitnessTest/physicalReport/resultSummarizing.vue'], resolve)
                            }
                        ]
                    },
                    {
                        path: '/testReport',
                        name: 'testReport',
                        meta: {
                            title: '统计汇总'
                        },
                        component: (resolve) => require(['./views/physicalFitnessTest/physicalPrepare/physicalPrepare.vue'], resolve),
                        children: [{
                                path: '/areaPhysicalReport',
                                name: 'areaPhysicalReport',
                                meta: {
                                    title: '区域汇总报告单'
                                },
                                component: resolve => require(['./views/physicalFitnessTest/physicalReport/areaPhysicalReport.vue'], resolve)
                            },
                            {
                                path: '/schoolPhysicalReport',
                                name: 'schoolPhysicalReport',
                                meta: {
                                    title: '学校汇总报告单'
                                },
                                component: resolve => require(['./views/physicalFitnessTest/physicalReport/schoolPhysicalReport.vue'], resolve)
                            },
                            {
                                path: '/gradePhysicalReport',
                                name: 'gradePhysicalReport',
                                meta: {
                                    title: '年级汇总报告单'
                                },
                                component: resolve => require(['./views/physicalFitnessTest/physicalReport/gradePhysicalReport.vue'], resolve)
                            },
                            {
                                path: '/classPhysicalReport',
                                name: 'classPhysicalReport',
                                meta: {
                                    title: '班级汇总报告单'
                                },
                                component: resolve => require(['./views/physicalFitnessTest/physicalReport/classPhysicalReport.vue'], resolve)
                            },
                            {
                                path: '/agePhysicalReport',
                                name: 'agePhysicalReport',
                                meta: {
                                    title: '年龄汇总报告单'
                                },
                                component: resolve => require(['./views/physicalFitnessTest/physicalReport/agePhysicalReport.vue'], resolve)
                            },
                            {
                                path: '/genderPhysicalReport',
                                name: 'genderPhysicalReport',
                                meta: {
                                    title: '性别汇总报告单'
                                },
                                component: resolve => require(['./views/physicalFitnessTest/physicalReport/genderPhysicalReport.vue'], resolve)
                            },
                            {
                                path: '/allPhysicalReport',
                                name: 'allPhysicalReport',
                                meta: {
                                    title: '体测项目报告单'
                                },
                                component: resolve => require(['./views/physicalFitnessTest/physicalReport/allPhysicalReport.vue'], resolve)
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        path: '*',
        redirect: '/index'
    }
];

export default routers;
