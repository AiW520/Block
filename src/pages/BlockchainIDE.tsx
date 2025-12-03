import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// 示例智能合约代码
const sampleContract = `// 简单的区块链投票合约
contract Voting {
    // 候选人结构体
    struct Candidate {
        string name;
        uint256 voteCount;
    }
    
    // 合约状态变量
    address public owner;
    mapping(address => bool) public hasVoted;
    Candidate[] public candidates;
    
    // 事件定义
    event Voted(address indexed voter, uint256 indexed candidateIndex);
    
    // 构造函数
    constructor(string[] memory candidateNames) {
        owner = msg.sender;
        
        // 初始化候选人
        for (uint256 i = 0; i < candidateNames.length; i++) {
            candidates.push(Candidate({
                name: candidateNames[i],
                voteCount: 0
            }));
        }
    }
    
    // 投票函数
    function vote(uint256 candidateIndex) public {
        // 验证投票人未投票
        require(!hasVoted[msg.sender], "你已经投过票了!");
        
        // 验证候选人索引有效
        require(candidateIndex < candidates.length, "无效的候选人索引!");
        
        // 记录投票
        hasVoted[msg.sender] = true;
        candidates[candidateIndex].voteCount++;
        
        // 触发投票事件
        emit Voted(msg.sender, candidateIndex);
    }
    
    // 获取候选人数量
    function getTotalCandidates() public view returns (uint256) {
        return candidates.length;
    }
    
    // 获取候选人信息
    function getCandidate(uint256 index) public view returns (string memory, uint256) {
        require(index < candidates.length, "无效的候选人索引!");
        Candidate memory candidate = candidates[index];
        return (candidate.name, candidate.voteCount);
    }
    
    // 获取所有候选人
    function getAllCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }
}`;

// 代码学习解释数据
const codeExplanations = [
    {
        line: 1, 
        explanation: "这是一个简单的区块链投票合约，用于演示智能合约的基本功能。"
    },
    {
        line: 3, 
        explanation: "定义了一个名为Candidate的结构体，包含候选人姓名和得票数量两个字段。"
    },
    {
        line: 9, 
        explanation: "声明了合约所有者地址，使用public修饰符使其可以被外部访问。"
    },
    {
        line: 10, 
        explanation: "使用mapping类型记录已投票地址，防止重复投票。"
    },
    {
        line: 11, 
        explanation: "创建候选人数组，存储所有候选人信息。"
    },
    {
        line: 13, 
        explanation: "定义了投票事件，用于记录投票行为。"
    },
    {
        line: 16, 
        explanation: "合约构造函数，初始化候选人列表。"
    },
    {
        line: 30, 
        explanation: "投票函数，实现了投票的核心逻辑。"
    },
    {
        line: 32, 
        explanation: "使用require语句验证投票人未投票。"
    },
    {
        line: 35, 
        explanation: "验证候选人索引是否有效。"
    },
    {
        line: 38, 
        explanation: "记录投票人已投票状态。"
    },
    {
        line: 39, 
        explanation: "增加候选人得票数量。"
    },
    {
        line: 42, 
        explanation: "触发投票事件，记录投票信息。"
    },
    {
        line: 46, 
        explanation: "获取候选人总数的视图函数。"
    },
    {
        line: 50, 
        explanation: "根据索引获取候选人信息的视图函数。"
    },
    {
        line: 57, 
        explanation: "获取所有候选人信息的视图函数。"
    }
];

export default function BlockchainIDE() {
    const [code, setCode] = useState(sampleContract);
    const [selectedLine, setSelectedLine] = useState<number | null>(null);
    const [output, setOutput] = useState<string[]>([]);
    const [isCompiling, setIsCompiling] = useState(false);
    const [isDeployed, setIsDeployed] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);
    
    // 合约模拟数据
    const [candidates, setCandidates] = useState<{name: string, voteCount: number}[]>([
        {name: "候选人A", voteCount: 0},
        {name: "候选人B", voteCount: 0},
        {name: "候选人C", voteCount: 0}
    ]);
    
    // 代码行高亮效果
    const [highlightedLine, setHighlightedLine] = useState<number | null>(null);
    
    // 模拟编译过程
    const handleCompile = () => {
        setIsCompiling(true);
        setOutput(["开始编译智能合约..."]);
        
        // 模拟编译延迟
        setTimeout(() => {
            setOutput([
                "开始编译智能合约...",
                "✓ 语法检查通过",
                "✓ 类型检查通过",
                "✓ 合约编译成功!",
                "智能合约编译完成，可部署到区块链网络。"
            ]);
            setIsCompiling(false);
        }, 2000);
    };
    
    // 模拟部署过程
    const handleDeploy = () => {
        if (!isDeployed) {
            setOutput([...output, "开始部署智能合约..."]);
            
            // 模拟部署延迟
            setTimeout(() => {
                setOutput([...output, "智能合约部署成功!"]);
                setIsDeployed(true);
                setOutput([...output, "合约地址: 0x1234567890abcdef1234567890abcdef12345678"]);
                setOutput([...output, "合约已准备好接收交易。"]);
            }, 3000);
        }
    };
    
    // 模拟投票功能
    const handleVote = () => {
        if (selectedCandidate !== null && isDeployed) {
            setOutput([...output, `投票给候选人 ${selectedCandidate + 1}...`]);
            
            // 模拟投票延迟
            setTimeout(() => {
                const updatedCandidates = [...candidates];
                updatedCandidates[selectedCandidate].voteCount++;
                setCandidates(updatedCandidates);
                
                setOutput([...output, `投票成功! 候选人 ${selectedCandidate + 1} 现在有 ${updatedCandidates[selectedCandidate].voteCount} 票。`]);
            }, 1500);
        } else if (!isDeployed) {
            setOutput([...output, "请先部署合约!"]);
        } else {
            setOutput([...output, "请选择一个候选人!"]);
        }
    };
    
    // 代码行点击处理
    const handleLineClick = (lineNumber: number) => {
        setSelectedLine(lineNumber);
        setHighlightedLine(lineNumber);
        
        // 3秒后自动取消高亮
        setTimeout(() => {
            setHighlightedLine(null);
        }, 3000);
    };
    
    // 获取当前选中行的解释
    const getCurrentExplanation = () => {
        if (!selectedLine) return null;
        return codeExplanations.find(exp => exp.line === selectedLine);
    };
    
    // 将代码按行分割
    const codeLines = code.split('\n');
    
    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#00f5ff] to-[#00ff9d]">
                        区块链代码开发平台
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        学习智能合约开发，编写、编译和部署区块链应用
                    </p>
                </motion.div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* 代码学习解释区域 */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-1"
                    >
                        <div className="bg-[#0c0c2a] rounded-xl border border-[#1a1a3a] p-6 h-full">
                            <h2 className="text-2xl font-bold mb-6 text-[#00f5ff]">
                                代码学习解释
                            </h2>
                            
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold mb-3">核心概念</h3>
                                    <ul className="space-y-2 text-gray-300">
                                        <li className="flex items-start">
                                            <i className="fa-solid fa-circle text-[#00ff9d] mt-1.5 mr-3 text-xs"></i>
                                            <span>智能合约是运行在区块链上的自动化脚本</span>
                                        </li>
                                        <li className="flex items-start">
                                            <i className="fa-solid fa-circle text-[#00ff9d] mt-1.5 mr-3 text-xs"></i>
                                            <span>使用Solidity语言编写，支持复杂的业务逻辑</span>
                                        </li>
                                        <li className="flex items-start">
                                            <i className="fa-solid fa-circle text-[#00ff9d] mt-1.5 mr-3 text-xs"></i>
                                            <span>合约一旦部署，不可篡改且自动执行</span>
                                        </li>
                                        <li className="flex items-start">
                                            <i className="fa-solid fa-circle text-[#00ff9d] mt-1.5 mr-3 text-xs"></i>
                                            <span>支持事件机制，记录重要操作日志</span>
                                        </li>
                                    </ul>
                                </div>
                                
                                <div>
                                    <h3 className="text-lg font-semibold mb-3">点击代码行查看详细解释</h3>
                                    {getCurrentExplanation() && (
                                        <div className="p-4 bg-[#1a1a3a] rounded-lg border border-[#00f5ff]">
                                            <h4 className="font-semibold mb-2 text-[#00ff9d]">
                                                第 {getCurrentExplanation()?.line} 行
                                            </h4>
                                            <p className="text-gray-300">
                                                {getCurrentExplanation()?.explanation}
                                            </p>
                                        </div>
                                    )}
                                    
                                    {!getCurrentExplanation() && (
                                        <div className="p-4 bg-[#1a1a3a] rounded-lg text-center text-gray-400">
                                            点击右侧代码行查看详细解释
                                        </div>
                                    )}
                                </div>
                                
                                <div>
                                    <h3 className="text-lg font-semibold mb-3">代码结构</h3>
                                    <div className="p-4 bg-[#1a1a3a] rounded-lg">
                                        <ul className="space-y-2 text-gray-300">
                                            <li className="flex justify-between">
                                                <span>合约定义</span>
                                                <span className="text-xs text-[#00ff9d]">1-5行</span>
                                            </li>
                                            <li className="flex justify-between">
                                                <span>状态变量</span>
                                                <span className="text-xs text-[#00ff9d]">7-12行</span>
                                            </li>
                                            <li className="flex justify-between">
                                                <span>事件定义</span>
                                                <span className="text-xs text-[#00ff9d]">14行</span>
                                            </li>
                                            <li className="flex justify-between">
                                                <span>构造函数</span>
                                                <span className="text-xs text-[#00ff9d]">17-28行</span>
                                            </li>
                                            <li className="flex justify-between">
                                                <span>投票函数</span>
                                                <span className="text-xs text-[#00ff9d]">31-46行</span>
                                            </li>
                                            <li className="flex justify-between">
                                                <span>查询函数</span>
                                                <span className="text-xs text-[#00ff9d]">48-67行</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    
                    {/* 代码编辑器和部署区域 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="lg:col-span-2 space-y-8"
                    >
                        {/* 代码编辑器 */}
                        <div className="bg-[#0c0c2a] rounded-xl border border-[#1a1a3a] p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-[#00f5ff]">
                                    智能合约编辑器
                                </h2>
                                <div className="flex gap-4">
                                    <button
                                        onClick={handleCompile}
                                        disabled={isCompiling}
                                        className="btn-hover px-4 py-2 rounded-lg bg-[#00f5ff] text-[#0a0a1f] font-bold text-sm flex items-center"
                                    >
                                        {isCompiling ? (
                                            <>
                                                <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                                                编译中...
                                            </>
                                        ) : (
                                            <>
                                                <i className="fa-solid fa-play mr-2"></i>
                                                编译
                                            </>
                                        )}
                                    </button>
                                    <button
                                        onClick={handleDeploy}
                                        disabled={!output.includes("✓ 合约编译成功!") || isDeployed}
                                        className="btn-hover px-4 py-2 rounded-lg bg-[#00ff9d] text-[#0a0a1f] font-bold text-sm flex items-center"
                                    >
                                        <i className="fa-solid fa-rocket mr-2"></i>
                                        {isDeployed ? "已部署" : "部署"}
                                    </button>
                                </div>
                            </div>
                            
                            <div className="bg-[#1a1a3a] rounded-lg p-4 overflow-x-auto">
                                <div className="flex">
                                    {/* 行号 */}
                                    <div className="flex flex-col items-end mr-4 text-gray-500 select-none">
                                        {codeLines.map((_, index) => (
                                            <div 
                                                key={index} 
                                                className="py-0.5 px-2 text-sm"
                                            >
                                                {index + 1}
                                            </div>
                                        ))}
                                    </div>
                                    
                                    {/* 代码内容 */}
                                    <div className="flex-1">
                                        {codeLines.map((line, index) => (
                                            <div 
                                                key={index} 
                                                className={`py-0.5 px-2 text-sm cursor-pointer transition-all ${highlightedLine === index + 1 ? 'bg-[#2a2a4a] rounded-l-lg' : ''}`}
                                                onClick={() => handleLineClick(index + 1)}
                                            >
                                                <code className="text-gray-300">{line}</code>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* 部署和交互区域 */}
                        <div className="bg-[#0c0c2a] rounded-xl border border-[#1a1a3a] p-6">
                            <h2 className="text-2xl font-bold mb-6 text-[#00f5ff]">
                                合约部署与交互
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* 部署输出 */}
                                <div>
                                    <h3 className="text-lg font-semibold mb-3">部署日志</h3>
                                    <div className="bg-[#1a1a3a] rounded-lg p-4 h-64 overflow-y-auto">
                                        {output.length === 0 ? (
                                            <div className="text-gray-400 text-center py-8">
                                                点击编译按钮开始编译智能合约
                                            </div>
                                        ) : (
                                            <div className="space-y-2">
                                                {output.map((line, index) => (
                                                    <div key={index} className="text-sm text-gray-300">
                                                        {line}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
                                {/* 投票功能 */}
                                <div>
                                    <h3 className="text-lg font-semibold mb-3">投票功能</h3>
                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="text-sm font-semibold mb-3 text-gray-400">选择候选人</h4>
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                                {candidates.map((candidate, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => setSelectedCandidate(index)}
                                                        className={`p-4 rounded-lg transition-all ${selectedCandidate === index ? 'bg-[#00f5ff] text-[#0a0a1f]' : 'bg-[#1a1a3a] text-gray-300 hover:bg-[#2a2a4a]'}`}
                                                    >
                                                        <div className="font-bold">{candidate.name}</div>
                                                        <div className="text-sm text-gray-400">{candidate.voteCount} 票</div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        <button
                                            onClick={handleVote}
                                            disabled={!isDeployed}
                                            className="btn-hover px-6 py-3 rounded-lg bg-gradient-to-r from-[#00f5ff] to-[#00ff9d] text-[#0a0a1f] font-bold text-lg w-full"
                                        >
                                            <i className="fa-solid fa-check-double mr-2"></i>
                                            提交投票
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* 学习要点 */}
                        <div className="bg-[#0c0c2a] rounded-xl border border-[#1a1a3a] p-6">
                            <h2 className="text-2xl font-bold mb-6 text-[#00f5ff]">
                                学习要点总结
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                                        <i className="fa-solid fa-book mr-3 text-[#00ff9d]"></i>
                                        智能合约基础
                                    </h3>
                                    <ul className="space-y-2 text-gray-300">
                                        <li className="flex items-start">
                                            <i className="fa-solid fa-check-circle text-[#00ff9d] mt-1 mr-3"></i>
                                            <span>理解智能合约的基本结构和语法</span>
                                        </li>
                                        <li className="flex items-start">
                                            <i className="fa-solid fa-check-circle text-[#00ff9d] mt-1 mr-3"></i>
                                            <span>学习Solidity语言的核心概念</span>
                                        </li>
                                        <li className="flex items-start">
                                            <i className="fa-solid fa-check-circle text-[#00ff9d] mt-1 mr-3"></i>
                                            <span>掌握状态变量和函数的使用</span>
                                        </li>
                                        <li className="flex items-start">
                                            <i className="fa-solid fa-check-circle text-[#00ff9d] mt-1 mr-3"></i>
                                            <span>了解合约部署和交互的过程</span>
                                        </li>
                                    </ul>
                                </div>
                                
                                <div>
                                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                                        <i className="fa-solid fa-code mr-3 text-[#00f5ff]"></i>
                                        开发实践
                                    </h3>
                                    <ul className="space-y-2 text-gray-300">
                                        <li className="flex items-start">
                                            <i className="fa-solid fa-check-circle text-[#00ff9d] mt-1 mr-3"></i>
                                            <span>学习编写安全可靠的智能合约</span>
                                        </li>
                                        <li className="flex items-start">
                                            <i className="fa-solid fa-check-circle text-[#00ff9d] mt-1 mr-3"></i>
                                            <span>理解区块链交易和事件机制</span>
                                        </li>
                                        <li className="flex items-start">
                                            <i className="fa-solid fa-check-circle text-[#00ff9d] mt-1 mr-3"></i>
                                            <span>掌握智能合约调试和测试方法</span>
                                        </li>
                                        <li className="flex items-start">
                                            <i className="fa-solid fa-check-circle text-[#00ff9d] mt-1 mr-3"></i>
                                            <span>了解区块链开发的最佳实践</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}