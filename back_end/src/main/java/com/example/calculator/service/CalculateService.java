package com.example.calculator.service;

import com.example.calculator.entity.Calculate;

import java.util.List;

public interface CalculateService {
    /**
     * 通过ID查询单条数据
     *
     * @param id 主键
     * @return 实例对象
     */
    Calculate queryById(Integer id);

    /**
     * 查询所有数据
     *
     * @return 对象列表
     */
    List<Calculate> queryAll(Calculate calculate);

    /**
     * 新增数据
     *
     * @param calculate 实例对象
     */
    void insert(Calculate calculate);

    /**
     * 分页查询所有数据
     *
     * @param page 页码
     * @return 对象列表
     */
    List<Calculate> queryAllByPage(Integer page);

    /**
     * 获取数据库中最后一条数据
     *
     * @return 最后一条记录的实例对象
     */
    List<Calculate> getLastRecord();
}
