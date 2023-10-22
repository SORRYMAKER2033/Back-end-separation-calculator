package com.example.calculator.dao;

import com.example.calculator.entity.Calculate;

import java.util.List;

public interface CalculateDao {
    /**
     * 通过ID查询单条数据
     *
     * @param id 主键
     * @return 实例对象
     */
    Calculate queryById(Integer id);

    /**
     * 通过实体作为筛选条件查询
     *
     * @param calculate 实例对象
     * @return 对象列表
     */
    List<Calculate> queryAll(Calculate calculate);

    /**
     * 新增数据
     *
     * @param calculate 实例对象
     * @return 影响行数
     */
    int insert(Calculate calculate);

    List<Calculate> queryAllByPage(Integer page);

    List<Calculate> getLastRecord();
}
