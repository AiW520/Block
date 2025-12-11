import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

// 游戏数据 - 基于区块链开发基础的知识点
const quizData = [
  {
    id: 1,
    category: '搭链',
    question: '区块链网络的基本组成部分不包括以下哪项？',
    options: [
      '节点',
      '共识机制',
      '中央服务器',
      '分布式账本'
    ],
    correctAnswer: '中央服务器',
    explanation: '区块链的核心特点就是去中心化，没有中央服务器，而是通过多个节点共同维护网络。'
  },
  {
    id: 2,
    category: '控制台',
    question: '在区块链控制台中，查询区块信息通常使用哪个命令？',
    options: [
      'getBlock',
      'findBlock',
      'searchBlock',
      'queryBlock'
    ],
    correctAnswer: 'getBlock',
    explanation: 'getBlock 是大多数区块链控制台中用于查询区块信息的标准命令。'
  },
  {
    id: 3,
    category: 'FISCO BCOS',
    question: 'FISCO BCOS 是哪种类型的区块链平台？',
    options: [
      '公链',
      '联盟链',
      '私有链',
      '混合链'
    ],
    correctAnswer: '联盟链',
    explanation: 'FISCO BCOS 是一个开源的企业级联盟链平台，专为企业级应用场景设计。'
  },
  {
    id: 4,
    category: 'WeBase',
    question: 'WeBase 主要提供什么功能？',
    options: [
      '加密货币挖矿',
      '区块链中间件服务',
      '去中心化交易所',
      '数字钱包管理'
    ],
    correctAnswer: '区块链中间件服务',
    explanation: 'WeBase 是一个区块链中间件平台，提供可视化管理、合约开发等功能。'
  },
  {
    id: 5,
    category: '搭链',
    question: '以下哪种不是常见的区块链共识机制？',
    options: [
      'PoW (工作量证明)',
      'PoS (权益证明)',
      'PBFT (实用拜占庭容错)',
      'HTTP (超文本传输协议)'
    ],
    correctAnswer: 'HTTP (超文本传输协议)',
    explanation: 'HTTP 是网络传输协议，不是区块链共识机制。'
  },
  {
    id: 6,
    category: '控制台',
    question: '在区块链中，交易发送后会进入哪个区域等待确认？',
    options: [
      '交易池',
      '区块链',
      '智能合约',
      '共识模块'
    ],
    correctAnswer: '交易池',
    explanation: '新交易首先进入交易池，等待矿工或验证节点打包进区块。'
  },
  {
    id: 7,
    category: 'FISCO BCOS',
    question: 'FISCO BCOS 支持哪种智能合约开发语言？',
    options: [
      'Java',
      'Python',
      'Solidity',
      '所有以上选项'
    ],
    correctAnswer: '所有以上选项',
    explanation: 'FISCO BCOS 支持 Solidity、Java、Python 等多种语言开发智能合约。'
  },
  {
    id: 8,
    category: 'WeBase',
    question: 'WeBase 合约IDE的主要功能是什么？',
    options: [
      '区块链节点部署',
      '智能合约编写和调试',
      '数字资产交易',
      '用户身份验证'
    ],
    correctAnswer: '智能合约编写和调试',
    explanation: 'WeBase 合约IDE主要用于智能合约的编写、编译、部署和调试。'
  }
];

// 游戏中的道具系统
const powerUps = [
  {
    id: 'hint',
    name: '提示卡',
    description: '排除一个错误选项',
    icon: 'fa-lightbulb',
    color: 'from-[#FFD700] to-[#FFA500]'
  },
  {
    id: 'skip',
    name: '跳过卡',
    description: '跳过当前题目',
    icon: 'fa-forward',
    color: 'from-[#8A2BE2] to-[#9370DB]'
  }
];

export default function BlockchainKnowledgeGame() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [powerUpInventory, setPowerUpInventory] = useState({
    hint: 2,
    skip: 1
  });
  const [usedPowerUps, setUsedPowerUps] = useState<Set<string>>(new Set());
  const [availableOptions, setAvailableOptions] = useState<string[]>([]);
  const navigate = useNavigate();

  // 初始化题目选项
  useEffect(() => {
    if (currentQuestion < quizData.length) {
      setAvailableOptions(quizData[currentQuestion].options);
      setSelectedAnswer(null);
      setShowResult(false);
      setUsedPowerUps(new Set());
    }
  }, [currentQuestion]);

  // 处理答案选择
  const handleAnswerSelect = (answer: string) => {
    if (selectedAnswer || showResult) return;
    
    setSelectedAnswer(answer);
    const isAnswerCorrect = answer === quizData[currentQuestion].correctAnswer;
    setIsCorrect(isAnswerCorrect);
    
    if (isAnswerCorrect) {
      setScore(prev => prev + 10);
    }
    
    // 显示结果
    setTimeout(() => {
      setShowResult(true);
    }, 500);
  };

  // 处理下一题
  const handleNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // 游戏结束
      setGameOver(true);
    }
  };

  // 使用提示卡
  const useHint = () => {
    if (powerUpInventory.hint <= 0 || showResult || usedPowerUps.has('hint')) return;
    
    // 排除一个错误选项
    const wrongOptions = availableOptions.filter(opt => opt !== quizData[currentQuestion].correctAnswer);
    if (wrongOptions.length > 0) {
      const optionToRemove = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
      setAvailableOptions(prev => prev.filter(opt => opt !== optionToRemove));
      
      // 更新道具数量和已使用状态
      setPowerUpInventory(prev => ({ ...prev, hint: prev.hint - 1 }));
      setUsedPowerUps(prev => new Set([...prev, 'hint']));
    }
  };

  // 使用跳过卡
  const useSkip = () => {
    if (powerUpInventory.skip <= 0 || showResult || usedPowerUps.has('skip')) return;
    
    // 更新道具数量
    setPowerUpInventory(prev => ({ ...prev, skip: prev.skip - 1 }));
    
    // 直接跳转到下一题
    setTimeout(() => {
      handleNextQuestion();
    }, 500);
  };

  // 渲染游戏结果页面
  const renderGameResult = () => {
    const accuracy = Math.round((score / (quizData.length * 10)) * 100);
    let resultTitle = '';
    let resultMessage = '';
    
    if (accuracy >= 90) {
      resultTitle = '区块链专家！';
      resultMessage = '你对区块链基础知识掌握得非常扎实，继续保持！';
    } else if (accuracy >= 70) {
      resultTitle = '表现优秀！';
      resultMessage = '你已经掌握了大部分区块链基础知识，再接再厉！';
    } else if (accuracy >= 50) {
      resultTitle = '基础良好';
      resultMessage = '你对区块链有一定了解，但还有提升空间，继续学习！';
    } else {
      resultTitle = '继续努力';
      resultMessage = '建议你再复习一下区块链基础知识，相信你一定能掌握！';
    }

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-[#0c0c2a] rounded-2xl p-8 border border-[#1a1a3a] max-w-3xl mx-auto"
      >
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#00f5ff] to-[#00ff9d]">
            游戏结束！
          </h2>
          
          <div className="flex justify-center items-center mb-8">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-[#00f5ff] to-[#00ff9d] flex items-center justify-center text-[#0a0a1f] font-bold text-5xl">
              {score}
            </div>
          </div>
          
          <h3 className="text-2xl font-bold mb-2">{resultTitle}</h3>
          <p className="text-gray-300 mb-8">{resultMessage}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-[#1a1a3a] p-4 rounded-xl">
              <p className="text-gray-400 text-sm">总题数</p>
              <p className="text-2xl font-bold">{quizData.length}</p>
            </div>
            <div className="bg-[#1a1a3a] p-4 rounded-xl">
              <p className="text-gray-400 text-sm">正确率</p>
              <p className="text-2xl font-bold">{accuracy}%</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => {
                setCurrentQuestion(0);
                setScore(0);
                setGameOver(false);
                setPowerUpInventory({ hint: 2, skip: 1 });
              }}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-[#00f5ff] to-[#00ff9d] text-[#0a0a1f] font-bold hover:opacity-90 transition-opacity"
            >
              再玩一次
            </button>
            <button
              onClick={() => navigate('/basics')}
              className="px-8 py-3 rounded-full bg-transparent border-2 border-[#00f5ff] text-[#00f5ff] font-bold hover:bg-[#00f5ff]/10 transition-colors"
            >
              返回学习
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  // 渲染当前题目
  const renderQuestion = () => {
    const questionData = quizData[currentQuestion];
    
    return (
      <div className="bg-[#0c0c2a] rounded-2xl p-8 border border-[#1a1a3a] mb-8">
        {/* 题目信息 */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 rounded-full bg-[#00f5ff]/20 text-[#00f5ff] text-sm font-medium">
              {questionData.category}
            </div>
            <span className="text-gray-400">问题 {currentQuestion + 1}/{quizData.length}</span>
          </div>
          <div className="flex items-center gap-2 text-[#00ff9d]">
            <i className="fa-solid fa-coins"></i>
            <span className="font-bold">{score}</span>
          </div>
        </div>
        
        {/* 题目内容 */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold mb-8"
        >
          {questionData.question}
        </motion.h2>
        
        {/* 选项列表 */}
        <div className="space-y-4 mb-8">
          {availableOptions.map((option, index) => {
            const isSelected = selectedAnswer === option;
            const isCorrectAnswer = option === questionData.correctAnswer;
            const showFeedback = showResult;
            
            let optionClass = 'p-4 rounded-xl border transition-all duration-300 cursor-pointer';
            if (!showFeedback) {
              optionClass += ' border-[#1a1a3a] hover:border-[#00f5ff] hover:bg-[#00f5ff]/5';
            } else if (isSelected && isCorrectAnswer) {
              optionClass += ' border-[#00ff9d] bg-[#00ff9d]/10 text-[#00ff9d]';
            } else if (isSelected && !isCorrectAnswer) {
              optionClass += ' border-[#ff4d4d] bg-[#ff4d4d]/10 text-[#ff4d4d]';
            } else if (isCorrectAnswer) {
              optionClass += ' border-[#00ff9d] bg-[#00ff9d]/10 text-[#00ff9d]';
            }
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={optionClass}
                onClick={() => handleAnswerSelect(option)}
              >
                <div className="flex items-center justify-between">
                  <span>{String.fromCharCode(65 + index)}. {option}</span>
                  {showFeedback && isSelected && isCorrectAnswer && (
                    <i className="fa-solid fa-check text-[#00ff9d]"></i>
                  )}
                  {showFeedback && isSelected && !isCorrectAnswer && (
                    <i className="fa-solid fa-times text-[#ff4d4d]"></i>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* 道具栏 */}
        {!showResult && (
          <div className="flex gap-4 mb-8">
            <button
              onClick={useHint}
              disabled={powerUpInventory.hint <= 0 || usedPowerUps.has('hint')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${powerUpInventory.hint <= 0 || usedPowerUps.has('hint') ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
            >
              <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${powerUps[0].color} flex items-center justify-center text-[#0a0a1f]`}>
                <i className={`fa-solid ${powerUps[0].icon}`}></i>
              </div>
              <span>{powerUps[0].name}</span>
              <span className="text-sm bg-[#1a1a3a] px-2 py-0.5 rounded-full">{powerUpInventory.hint}</span>
            </button>
            
            <button
              onClick={useSkip}
              disabled={powerUpInventory.skip <= 0 || usedPowerUps.has('skip')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${powerUpInventory.skip <= 0 || usedPowerUps.has('skip') ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
            >
              <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${powerUps[1].color} flex items-center justify-center text-[#0a0a1f]`}>
                <i className={`fa-solid ${powerUps[1].icon}`}></i>
              </div>
              <span>{powerUps[1].name}</span>
              <span className="text-sm bg-[#1a1a3a] px-2 py-0.5 rounded-full">{powerUpInventory.skip}</span>
            </button>
          </div>
        )}
        
        {/* 答案解析 */}
        {showResult && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.5 }}
            className="bg-[#1a1a3a] p-4 rounded-xl mb-6"
          >
            <h3 className="text-lg font-semibold mb-2 text-[#00f5ff]">解析：</h3>
            <p className="text-gray-300">{questionData.explanation}</p>
          </motion.div>
        )}
        
        {/* 下一题按钮 */}
        {showResult && (
          <motion.button
            onClick={handleNextQuestion}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-[#00f5ff] to-[#00ff9d] text-[#0a0a1f] font-bold text-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {currentQuestion < quizData.length - 1 ? '下一题' : '查看结果'}
          </motion.button>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0a0a1f] text-white py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <header className="text-center mb-12">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#00f5ff] to-[#00ff9d]"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            区块链知识问答挑战
          </motion.h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            通过互动问答测试你对区块链开发基础的掌握程度！
          </p>
        </header>
        
        {gameOver ? renderGameResult() : renderQuestion()}
        
        {/* 游戏说明 */}
        {!gameOver && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="bg-[#1a1a3a] rounded-xl p-6 border border-[#2a2a4a]"
          >
            <h3 className="text-xl font-semibold mb-4 text-[#00f5ff]">游戏规则：</h3>
            <ul className="list-disc pl-5 text-gray-300 space-y-2">
              <li>回答区块链开发基础相关的问题</li>
              <li>每答对一题获得10分</li>
              <li>可以使用提示卡排除错误选项，或使用跳过卡跳过当前题目</li>
              <li>完成所有题目后查看你的得分和排名</li>
            </ul>
          </motion.div>
        )}
        
        {/* 底部导航 */}
        <div className="mt-12 text-center">
          <Link 
            to="/basics" 
            className="text-[#00f5ff] hover:underline flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-arrow-left"></i>
            返回区块链开发基础
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
