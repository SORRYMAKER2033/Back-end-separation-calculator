package com.example.calculator.service.impl;

import com.example.calculator.dao.CalculateDao;
import com.example.calculator.entity.Calculate;
import com.example.calculator.service.CalculateService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service("calculateService")
public class CalculateServiceImpl implements CalculateService {
    @Resource
    private CalculateDao calculateDao;

    @Override
    public Calculate queryById(Integer id) {
        return this.calculateDao.queryById(id);
    }

    @Override
    public List<Calculate> queryAll(Calculate calculate) {
        return this.calculateDao.queryAll(calculate);
    }

    @Override
    public void insert(Calculate calculate) {
        this.calculateDao.insert(calculate);
    }

    @Override
    public List<Calculate> queryAllByPage(Integer page) {
        return calculateDao.queryAllByPage(page);
    }

    @Override
    public List<Calculate> getLastRecord() {
        return calculateDao.getLastRecord();
    }
}