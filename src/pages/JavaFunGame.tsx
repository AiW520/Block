import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function JavaFunGame() {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [userCode, setUserCode] = useState('');
  const [executionResult, setExecutionResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 游戏关卡数据
  const levels = [
    {
      id: 1,
      title: 'Hello World',
      description: '打印你的第一行Java代码："Hello Java World!"',
      hints: [
        '使用System.out.println()函数',
        '记得在字符串周围加上引号',
        'Java语句需要以分号结尾'
      ],
      solution: 'System.out.println("Hello Java World!");',
      checkPattern: /Hello\s+Java\s+World!/
    },
    {
      id: 2,
      title: '变量魔法',
      description: '创建一个名为num的整数变量，赋值为42，然后打印它',
      hints: [
        '使用int关键字声明整数变量',
        '使用=进行赋值',
        '将变量名放入println函数中'
      ],
      solution: 'int num = 42;\nSystem.out.println(num);',
      checkPattern: /42/
    },
    {
      id: 3,
      title: '条件判断',
      description: '创建一个if语句，当数字大于10时打印"Big number"',
      hints: [
        'if语句的格式是：if (condition) { ... }',
        '使用>运算符比较大小',
        '在花括号内编写println语句'
      ],
      solution: 'int number = 15;\nif (number > 10) {\n    System.out.println("Big number");\n}',
      checkPattern: /Big\s+number/
    },
    {
      id: 4,
      title: 'for循环基础',
      description: '使用for循环打印数字1到5',
      hints: [
        'for循环的格式是：for (初始化; 条件; 更新) { ... }',
        '在循环体内使用System.out.println()打印变量',
        '确保循环变量从1开始，到5结束'
      ],
      solution: 'for (int i = 1; i <= 5; i++) {\n    System.out.println(i);\n}',
      checkPattern: /1\s*\n\s*2\s*\n\s*3\s*\n\s*4\s*\n\s*5/  
    },
    {
      id: 5,
      title: 'while循环挑战',
      description: '使用while循环打印数字1到5',
      hints: [
        'while循环的格式是：while (条件) { ... }',
        '需要在循环前初始化变量',
        '在循环体内更新变量值'
      ],
      solution: 'int i = 1;\nwhile (i \u003c= 5) {\n    System.out.println(i);\n    i++;\n}',
      checkPattern: /1\s*\n\s*2\s*\n\s*3\s*\n\s*4\s*\n\s*5/
    },
    {
      id: 6,
      title: '数组基础',
      description: '创建一个整数数组并打印第一个和最后一个元素',
      hints: [
        '数组声明格式：int[] 数组名 = {元素1, 元素2, ...};',
        '数组索引从0开始',
        '使用数组名[索引]访问元素'
      ],
      solution: 'int[] numbers = {10, 20, 30, 40, 50};\nSystem.out.println(numbers[0]);\nSystem.out.println(numbers[4]);',
      checkPattern: /10\s*\n\s*50/
    },
    {
      id: 7,
      title: '数组遍历',
      description: '使用for循环遍历数组并打印所有元素',
      hints: [
        '使用数组名.length获取数组长度',
        'for循环变量可以作为数组索引',
        '确保循环从0开始，到length-1结束'
      ],
      solution: 'int[] numbers = {10, 20, 30, 40, 50};\nfor (int i = 0; i \\u003c numbers.length; i++) {\n    System.out.println(numbers[i]);\n}',
      checkPattern: /10\\s*\\n\\s*20\\s*\\n\\s*30\\s*\\n\\s*40\\s*\\n\\s*50/
    },
    {
      id: 8,
      title: '方法定义基础',
      description: '定义一个无参数的方法并调用它',
      hints: [
        '方法定义格式：void 方法名() { ... }',
        '在方法体内编写要执行的代码',
        '通过方法名()调用方法'
      ],
      solution: 'void printHello() {\n    System.out.println("Hello from method!");\n}\n\nprintHello();',
      checkPattern: /Hello\s+from\s+method!/
    },
    {
      id: 9,
      title: '带参数的方法',
      description: '定义一个带参数并返回值的方法',
      hints: [
        '方法定义格式：返回类型 方法名(参数类型 参数名) { ... }',
        '使用return语句返回结果',
        '调用方法时传入参数并打印结果'
      ],
      solution: 'int addNumbers(int a, int b) {\n    return a + b;\n}\n\nint result = addNumbers(5, 3);\nSystem.out.println(result);',
      checkPattern: /8/
    },
    {
      id: 10,
      title: '字符串拼接',
      description: '创建两个字符串并将它们拼接后打印',
      hints: [
        '使用String关键字声明字符串变量',
        '可以使用+运算符拼接字符串',
        '记得为字符串变量赋值时使用双引号'
      ],
      solution: 'String firstName = "Java";\nString lastName = "Fun";\nString fullName = firstName + " " + lastName;\nSystem.out.println(fullName);',
      checkPattern: /Java\s+Fun/
    },
    {
      id: 11,
      title: '字符串方法',
      description: '使用字符串的length()和toUpperCase()方法',
      hints: [
        '字符串方法通过点符号调用：字符串变量.方法名()',
        'length()方法返回字符串长度',
        'toUpperCase()方法将字符串转换为大写'
      ],
      solution: 'String text = "Java Programming";\nSystem.out.println(text.length());\nSystem.out.println(text.toUpperCase());',
      checkPattern: /16\s*\n\s*JAVA\s+PROGRAMMING/
    },
    {
      id: 12,
      title: '类和对象基础',
      description: '创建一个简单的类和它的对象',
      hints: [
        '类定义格式：class 类名 { ... }',
        '使用new关键字创建对象',
        '对象可以调用类中的方法'
      ],
      solution: 'class Person {\n    void sayHello() {\n        System.out.println("Hello from Person class!");\n    }\n}\n\nPerson person = new Person();\nperson.sayHello();',
      checkPattern: /Hello\s+from\s+Person\s+class!/
    },
    {
      id: 13,
      title: '属性和方法',
      description: '创建一个带有属性和方法的类',
      hints: [
        '在类中声明属性（成员变量）',
        '创建构造方法初始化属性',
        '通过对象访问属性和方法'
      ],
      solution: 'class Car {\n    String brand;\n    \n    Car(String b) {\n        brand = b;\n    }\n    \n    void displayInfo() {\n        System.out.println("Car brand: " + brand);\n    }\n}\n\nCar myCar = new Car("JavaCar");\nmyCar.displayInfo();',
      checkPattern: /Car\s+brand:\s+JavaCar/
    }
  ];

  const currentLevelData = levels[currentLevel - 1];

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserCode(e.target.value);
  };

  const handleRunCode = () => {
    setIsLoading(true);
    // 模拟代码执行（实际项目中可能需要后端服务）
    setTimeout(() => {
      try {
        // 简单的代码验证逻辑
        if (currentLevelData.checkPattern.test(userCode)) {
          setExecutionResult('🎉 太棒了！你成功完成了这个挑战！');
        } else {
          setExecutionResult('💡 提示：请检查你的代码是否符合要求。');
        }
      } catch (error) {
        setExecutionResult(`❌ 执行错误：${error instanceof Error ? error.message : '未知错误'}`);
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };

  const handleNextLevel = () => {
    if (currentLevel < levels.length) {
      setCurrentLevel(currentLevel + 1);
      setUserCode('');
      setExecutionResult('');
    }
  };

  const handlePrevLevel = () => {
    if (currentLevel > 1) {
      setCurrentLevel(currentLevel - 1);
      setUserCode('');
      setExecutionResult('');
    }
  };

  const handleShowSolution = () => {
    setUserCode(currentLevelData.solution);
  };

  return (
    <div className="min-h-screen bg-[#0a0a1f] text-white py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto"
      >
        <header className="text-center mb-12">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#00f5ff] to-[#00ff9d]"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Java趣味编程挑战
          </motion.h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            通过游戏学习Java编程，一步步提升你的编程技能！
          </p>
        </header>

        <div className="bg-[#0c0c2a] rounded-2xl shadow-xl p-6 border border-[#1a1a3a]">
          {/* 关卡信息 */}
          <div className="mb-8 border-b border-[#1a1a3a] pb-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#00f5ff] to-[#00ff9d] flex items-center justify-center text-[#0a0a1f] font-bold text-xl">
                  {currentLevel}
                </div>
                <h2 className="text-2xl font-bold">{currentLevelData.title}</h2>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={handlePrevLevel} 
                  disabled={currentLevel === 1}
                  className="px-4 py-2 rounded-full bg-[#1a1a3a] hover:bg-[#2a2a4a] transition-colors disabled:opacity-50"
                >
                  上一关
                </button>
                <button 
                  onClick={handleNextLevel} 
                  disabled={currentLevel === levels.length}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-[#00f5ff] to-[#00ff9d] text-[#0a0a1f] font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  下一关
                </button>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              <strong className="text-[#00f5ff]">任务：</strong>{currentLevelData.description}
            </p>
            
            {/* 提示部分 */}
            <div className="bg-[#101030] rounded-xl p-4 border border-[#2a2a4a]">
              <h3 className="text-lg font-semibold mb-2 text-[#00f5ff]">💡 提示</h3>
              <ul className="list-disc pl-5 text-gray-300 space-y-1">
                {currentLevelData.hints.map((hint, index) => (
                  <li key={index}>{hint}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* 代码编辑器 */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-semibold">代码编辑器</h3>
              <button 
                onClick={handleShowSolution} 
                className="px-4 py-1.5 rounded-full bg-[#1a1a3a] hover:bg-[#2a2a4a] transition-colors text-sm"
              >
                查看答案
              </button>
            </div>
            <div className="relative">
              <textarea
                value={userCode}
                onChange={handleCodeChange}
                placeholder={`// 在这里编写Java代码\n${currentLevel === 1 ? 'System.out.println("Hello Java World!");' : ''}`}
                className="w-full h-64 p-4 rounded-xl bg-[#08081a] border border-[#1a1a3a] text-gray-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#00f5ff] focus:border-transparent resize-none"
                spellCheck="false"
              />
              <div className="absolute top-3 right-3 text-xs text-gray-500 font-mono">
                Java
              </div>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex justify-end mb-6">
            <motion.button
              onClick={handleRunCode}
              disabled={isLoading}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#00f5ff] to-[#00ff9d] text-[#0a0a1f] font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLoading ? '执行中...' : '运行代码'}
            </motion.button>
          </div>

          {/* 执行结果 */}
          {executionResult && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-[#08081a] rounded-xl p-4 border border-[#1a1a3a]"
            >
              <h3 className="text-lg font-semibold mb-2 text-[#00f5ff]">执行结果</h3>
              <pre className="text-gray-300 font-mono text-sm whitespace-pre-wrap">
                {executionResult}
              </pre>
            </motion.div>
          )}
        </div>

        {/* 游戏进度 */}
        <div className="mt-12 bg-[#0c0c2a] rounded-2xl shadow-xl p-6 border border-[#1a1a3a]">
          <h3 className="text-2xl font-bold mb-6 text-center">游戏进度</h3>
          <div className="w-full bg-[#08081a] rounded-full h-3 mb-2">
            <motion.div 
              className="h-3 rounded-full bg-gradient-to-r from-[#00f5ff] to-[#00ff9d]" 
              initial={{ width: 0 }}
              animate={{ width: `${(currentLevel / levels.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-400">
            <span>关卡 {currentLevel}</span>
            <span>共 {levels.length} 关</span>
          </div>
          
          {/* 关卡列表 */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {levels.map((level, index) => (
              <motion.div
                key={level.id}
                whileHover={{ scale: 1.03 }}
                className={`p-3 rounded-xl cursor-pointer transition-all ${currentLevel === level.id ? 'bg-gradient-to-r from-[#00f5ff] to-[#00ff9d] text-[#0a0a1f] font-semibold' : 'bg-[#08081a] border border-[#1a1a3a] hover:border-[#2a2a4a]'}`}
                onClick={() => setCurrentLevel(level.id)}
              >
                <div className="flex justify-between items-center">
                  <span>关卡 {level.id}</span>
                  <span>{level.title}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 游戏说明 */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-12 text-center text-gray-400"
        >
          <p>通过解决各种Java编程挑战来提升你的编程技能！</p>
          <p className="mt-2">每个关卡都有不同的编程任务和提示，帮助你学习Java编程的基础知识。</p>
        </motion.div>
      </motion.div>
    </div>
  );
}