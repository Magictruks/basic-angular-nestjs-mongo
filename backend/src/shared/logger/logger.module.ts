import { Module } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from "path";

const logDirPath = path.join(__dirname + '/../../../logs');

const dirExist = () => {
  if (!fs.existsSync(logDirPath)) {
    fs.mkdirSync(logDirPath);
  }
}

const dateMessageParse = (message, context) => {
  const f = (date) => (date < 10 ? `0${date}` : date);
  const date = new Date(Date.now());
  return `[Nest] - ${f(date.getDay())}/${f(date.getMonth())}/${f(date.getFullYear())} à ${f(date.getHours())}:${f(date.getMinutes())}:${f(date.getSeconds())}   [${context}] ${message}\n`;
}

export class ConfigLogger extends Logger {
  log(message: string, context: string) {
    dirExist();
    fs.writeFileSync(`${logDirPath}/console.txt`, dateMessageParse(message, context), { encoding: "utf8", flag: 'a+' });
    super.log(message, context);
  }
  error(message: string, trace: string, context: string) {
    dirExist();
    fs.writeFileSync(`${logDirPath}/error.txt`, dateMessageParse(message, context), { encoding: "utf8", flag: 'a+' });
    super.error(message, trace, context);
  }
  warn(message: string, context: string) {
    dirExist();
    fs.writeFileSync(`${logDirPath}/warn.txt`, dateMessageParse(message, context), { encoding: "utf8", flag: 'a+' });
    super.log(message, context);
  }
  debug(message: string, context: string) {
    dirExist();
    fs.writeFileSync(`${logDirPath}/debug.txt`, dateMessageParse(message, context), { encoding: "utf8", flag: 'a+' });
    super.log(message, context);
  }
  verbose(message: string, context: string) {
    dirExist();
    fs.writeFileSync(`${logDirPath}/verbose.txt`, dateMessageParse(message, context), { encoding: "utf8", flag: 'a+' });
    super.log(message, context);
  }
}


@Module({
  providers: [ConfigLogger],
})
export class LoggerModule {}
