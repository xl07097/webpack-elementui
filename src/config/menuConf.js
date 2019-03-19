/* eslint-disable no-undef */
const menu = {
    system: [
        {
            'title': '系统管理',
            'name': 'system',
            'children': [
                {
                    'title': '用户管理',
                    'icon': require('../assets/menu/user.png'),
                    'name': 'user'
                },
                {
                    'title': '角色管理',
                    'icon': require('../assets/menu/role.png'),
                    'name': 'role'
                },
                // {
                //     'title': '功能管理',
                //     'icon': require('../assets/menu/functional.png'),
                //     'name': 'functional',
                // },
                {
                    'title': '字典类别管理',
                    'icon': require('../assets/menu/dictionaryType.png'),
                    'name': 'dictionaryType'
                },
                {
                    'title': '字典信息管理',
                    'icon': require('../assets/menu/dictionaryInfo.png'),
                    'name': 'dictionaryInfo'
                },
                {
                    'title': '通知管理',
                    'icon': require('../assets/menu/noticeManage.png'),
                    'name': 'noticeManage'
                },
                {
                    'title': '通知',
                    'icon': require('../assets/menu/notice.png'),
                    'name': 'notice'
                }
            ]
        }
    ],
    dataCenter: [
        {
            'title': '数据中心',
            'name': 'dataCenter',
            'children': [
                {
                    'title': '基础构建服务',
                    'icon': require('../assets/menu/basicFoundation.png'),
                    'name': 'basicFoundation',
                    'children': [
                        // {
                        //     'title': '数据库管理',
                        //     'name': 'dateManager',
                        // }, {
                        //     'title': '自动备份计划',
                        //     'name': 'automaticBackup',
                        // }, {
                        //     'title': '手动备份',
                        //     'name': 'manualBackup',
                        // }, {
                        //     'title': '数据恢复',
                        //     'name': 'dataRecovery',
                        // },
                        {
                            'title': '系统日志',
                            'name': 'systemDialog'
                        },
                        {
                            'title': '标准化导出',
                            'name': 'standardizedOut'
                        },
                        {
                            'title': '标准化导入',
                            'name': 'standardizedImport'
                        }
                        // , {
                        //     'title': '数据库同步计划',
                        //     'name': 'databaseSynchronization',
                        // }
                    ]
                },
                // {
                //     'title': '接入管理服务',
                //     'icon': require('../assets/menu/intervention.png'),
                //     'name': 'intervention',
                //     children: [
                //         {
                //             'title': '接入编码管理',
                //             'name': 'encoding',
                //         },
                //         {
                //             'title': '接入点管理',
                //             'name': 'accessPoint',
                //         },
                //         {
                //             'title': '接入点注册',
                //             'name': 'accessEnroll',
                //         },
                //     ]
                // }, {
                //     'title': '运行监控服务',
                //     'icon': require('../assets/menu/monitor.png'),
                //     'name': 'monitor',
                //     children: [
                //         {
                //             'title': '数据库运行监控服务',
                //             'name': 'monitorService',
                //         },
                //         {
                //             'title': '接入点运行监控服务',
                //             'name': 'accessMonitoring',
                //         },
                //         {
                //             'title': '数据交换与共享监控服务',
                //             'name': 'dataExchangeMonitoring',
                //         },
                //     ]
                // }, {
                //     'title': '数据交换服务',
                //     'icon': require('../assets/menu/exchange.png'),
                //     'name': 'exchange',
                //     children: [
                //         {
                //             'title': '数据交换标准定义',
                //             'name': 'exchangeDefinition',
                //         }
                //     ]
                // },
                {
                    'title': '基础数据信息',
                    'icon': require('../assets/menu/basicData.png'),
                    'name': 'basicData',
                    children: [
                        {
                            'title': '医疗机构信息管理',
                            'name': 'unit'
                        },
                        {
                            'title': '科室信息管理',
                            'name': 'sectionInfo'
                        },
                        {
                            'title': '医生信息管理',
                            'name': 'doctorInfo'
                        },
                        {
                            'title': '学校信息管理',
                            'name': 'schoolInfo'
                        },
                        {
                            'title': '校医信息管理',
                            'name': 'schDocInfo'
                        },
                        {
                            'title': '老师信息管理',
                            'name': 'teacherInfo'
                        },
                        {
                            'title': '班级信息管理',
                            'name': 'classInfo'
                        },
                        {
                            'title': '学生信息管理',
                            'name': 'studentInfo'
                        }
                    ]
                },
                {
                    'title': '参数配置',
                    'icon': require('../assets/menu/basicFoundation.png'),
                    'name': 'DataConfig',
                    children: [
                        {
                            'title': '体检项目参数配置',
                            'name': 'examinationItemConf'
                        },
                        {
                            'title': '体测项目参数配置',
                            'name': 'physicalParaConfig'
                        }
                    ]
                }
            ]
        }
    ],
    medicalExamination: [
        {
            'title': '统一体检',
            'name': 'medicalExamination',
            'children': [
                {
                    'title': '体检准备',
                    'icon': require('../assets/menu/prepare.png'),
                    'name': 'prepare',
                    'children': [
                        {
                            'title': '学生体检名单校对',
                            'name': 'proofreading'
                        },
                        // {
                        //     'title': '学生体检名单校对',
                        //     'name': 'medicalHistory',
                        // },
                        {
                            'title': '学校班级人数审核',
                            'name': 'review'
                        },
                        {
                            'title': '体检项目规划',
                            'name': 'examinationPlan'
                        },
                        {
                            'title': '设定体检计划',
                            'name': 'examinationTeamConfig'
                        },
                        // {
                        //     'title': '设定体检对象',
                        //     'name': 'setObjects',
                        // },
                        {
                            'title': '体检排程',
                            'name': 'schedule'
                        }
                        // {
                        //     'title': '体检计划规划(自动)',
                        //     'name': 'autoPlan'
                        // },
                    ]
                },
                {
                    'title': '体检报告',
                    'icon': require('../assets/menu/medicalReport.png'),
                    'name': 'medicalReport',
                    'children': [
                        {
                            'title': '县市学校体检数据批量导入',
                            'name': 'schoolImport'
                        },
                        {
                            'title': '体检数据批量导出',
                            'name': 'examImport'
                        },
                        {
                            'title': '体检结果通知',
                            'name': 'examResult'
                        },
                        {
                            'title': '电子体检报告',
                            'name': 'personSummaryReport'
                        }
                    ]
                },
                {
                    'title': '体检复查反馈',
                    'icon': require('../assets/menu/reTest.png'),
                    'name': 'reTests',
                    children: [
                        {
                            'title': '校医复测',
                            'name': 'reTest'
                        }
                    ]
                },
                {
                    'title': '统计汇总',
                    'icon': require('../assets/menu/statistics.png'),
                    'name': 'statistics',
                    children: [
                        {
                            'title': '体检报告报告单汇总',
                            'name': 'summaryReport'
                        },
                        // {
                        //     'title': '区域学校汇总报告单',
                        //     'name': 'areaSummaryReport'
                        // },
                        // {
                        //     'title': '年级汇总报告单',
                        //     'name': 'gradeSummaryReport'
                        // },
                        // {
                        //     'title': '班级汇总报告单',
                        //     'name': 'classSummaryReport'
                        // },
                        // {
                        //     'title': '年龄汇总报告单',
                        //     'name': 'ageSummaryReport'
                        // },
                        // {
                        //     'title': '性别汇总报告单',
                        //     'name': 'genderSummaryReport'
                        // },
                        // {
                        //     'title': '体检项目报告单',
                        //     'name': 'projectSummaryReport'
                        // },
                    ]
                },
                {
                    'title': '数据上报',
                    'icon': require('../assets/menu/dataReport.png'),
                    'name': 'dataReport',
                    children: [
                        {
                            'title': '上报体检数据模板设定',
                            'name': 'templetSet'
                        }
                    ]
                }
            ]
        }
    ],
    physicalFitnessTest: [
        {
            'title': '健康体测',
            'name': 'physicalFitnessTest',
            'children': [
                {
                    'title': '体测准备',
                    'icon': require('../assets/menu/physicalPrepare.png'),
                    'name': 'physicalPrepare',
                    'children': [
                        // {
                        //     'title': '体测项目规划',
                        //     'name': 'projectPlan',
                        // },
                        {
                            'title': '体测项目规划',
                            'name': 'projectPlanNew'
                        },
                        // {
                        //     'title': '体测项目评分标准设置',
                        //     'name': 'scoringStandards',
                        // },
                        {
                            'title': '体测计划规划（手动）',
                            'name': 'physicalTestPlan',
                            'children': [
                                {
                                    'title': '设定体测对象',
                                    'name': 'physicaltestobject'
                                },
                                {
                                    'title': '体测排程',
                                    'name': 'physicalschedule'
                                },
                                {
                                    'title': '审核',
                                    'name': 'physicalaudit'
                                }
                            ]
                        }
                    ]
                },
                {
                    'title': '体测报告',
                    'icon': require('../assets/menu/physicalReport.png'),
                    'name': 'physicalReport',
                    'children': [
                        {
                            'title': '电子体测报告',
                            'name': 'elecPhysicalReport'
                        },
                        {
                            'title': '县市学校体测数据',
                            'name': 'physicalData'
                        },
                        {
                            'title': '体测结果汇总',
                            'name': 'resultSummarizing'
                        },
                        {
                            'title': '体测结果通知',
                            'name': 'resultInform'
                        }
                    ]
                },
                {
                    'title': '统计汇总',
                    'icon': require('../assets/menu/statistics.png'),
                    'name': 'testReport',
                    'children': [
                        {
                            'title': '区域汇总报告单',
                            'name': 'areaPhysicalReport'
                        },
                        {
                            'title': '学校汇总报告单',
                            'name': 'schoolPhysicalReport'
                        },
                        {
                            'title': '年级汇总报告单',
                            'name': 'gradePhysicalReport'
                        },
                        {
                            'title': '班级汇总报告单',
                            'name': 'classPhysicalReport'
                        },
                        {
                            'title': '年龄汇总报告单',
                            'name': 'agePhysicalReport'
                        },
                        {
                            'title': '性别汇总报告单',
                            'name': 'genderPhysicalReport'
                        },
                        {
                            'title': '体测项目报告单',
                            'name': 'allPhysicalReport'
                        }
                    ]
                }
            ]
        }
    ]
};
export default menu;
