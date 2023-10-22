package com.example.calculator.controller;

import com.example.calculator.entity.Calculate;
import com.example.calculator.service.CalculateService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("calculate")
public class CalculateController {
    /**
     * 服务对象
     */
    @Resource
    private CalculateService calculateService;

    /**
     * 通过主键查询单条数据
     *
     * @param id 主键
     * @return 单条数据
     */
    @GetMapping("selectOne")
    public Calculate selectOne(Integer id) {
        Calculate calculate = this.calculateService.queryById(id);
        return calculate;
    }

    /**
     * 查询所有数据
     *
     */
    @PostMapping("queryAll")
    public List<Calculate> queryAll(@RequestBody Calculate calculate) {
        List<Calculate> calculateList = this.calculateService.queryAll(calculate);
        return calculateList;
    }

    @PostMapping("getLastRecord")
    public List<Calculate> getLastRecord() {
        return (List<Calculate>) this.calculateService.getLastRecord();
    }

    /**
     * 分页查询所有数据
     *
     */
    @PostMapping("queryAllByPage")
    public List<Calculate> queryAll(Integer page) {
        List<Calculate> calculateList = this.calculateService.queryAllByPage(page);
        return calculateList;
    }

    /**
     * 新增数据
     *
     * @param calculate 实例对象
     * @return 实例对象
     */
    @PostMapping("save")
    public String insert(@RequestBody Calculate calculate) {
        this.calculateService.insert(calculate);
        return "ok";
    }


}
