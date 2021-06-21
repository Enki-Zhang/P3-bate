# 汕头大学生物安全三级实验室管理系统

##### 推荐使用 npm 安装所需组件
`npm install`

##### 运行 dev
`npm run serve`

##### 打包命令
`npm run build`

#### 项目访问地址
[外网环境] <http://120.241.104.176:9000>

#### 项目部署方式
- jenkins自动部署, 任务名称：stu-p3lab-front
- 项目部署步骤
```sh 
cd /home/bigdata398/project/stu-p3lab-front
git fetch --all && git reset --hard origin/master && git pull
npm install && npm run build
cp -r dist   /home/bigdata398/project/nginx/html/stu-p3lab-front
```