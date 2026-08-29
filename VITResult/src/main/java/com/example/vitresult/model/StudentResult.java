package com.example.vitresult.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name = "student_results")
public class StudentResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String prn;
    private String name;
    private String branch;
    private Integer semester;

    @Column(name = "mse_sub1")
    private Double mseSub1;
    @Column(name = "ese_sub1")
    private Double eseSub1;
    @Column(name = "total_sub1")
    private Double totalSub1;

    @Column(name = "mse_sub2")
    private Double mseSub2;
    @Column(name = "ese_sub2")
    private Double eseSub2;
    @Column(name = "total_sub2")
    private Double totalSub2;

    @Column(name = "mse_sub3")
    private Double mseSub3;
    @Column(name = "ese_sub3")
    private Double eseSub3;
    @Column(name = "total_sub3")
    private Double totalSub3;

    @Column(name = "mse_sub4")
    private Double mseSub4;
    @Column(name = "ese_sub4")
    private Double eseSub4;
    @Column(name = "total_sub4")
    private Double totalSub4;

    @Column(name = "grand_total")
    private Double grandTotal;
    private Double percentage;
    private String grade;
    private String status;

    public StudentResult() {}

    public void calculateResult() {
        double m1 = mseSub1 != null ? mseSub1 : 0;
        double e1 = eseSub1 != null ? eseSub1 : 0;
        double m2 = mseSub2 != null ? mseSub2 : 0;
        double e2 = eseSub2 != null ? eseSub2 : 0;
        double m3 = mseSub3 != null ? mseSub3 : 0;
        double e3 = eseSub3 != null ? eseSub3 : 0;
        double m4 = mseSub4 != null ? mseSub4 : 0;
        double e4 = eseSub4 != null ? eseSub4 : 0;

        this.totalSub1 = (m1 * 0.3) + (e1 * 0.7);
        this.totalSub2 = (m2 * 0.3) + (e2 * 0.7);
        this.totalSub3 = (m3 * 0.3) + (e3 * 0.7);
        this.totalSub4 = (m4 * 0.3) + (e4 * 0.7);

        this.grandTotal = this.totalSub1 + this.totalSub2 + this.totalSub3 + this.totalSub4;
        this.percentage = (this.grandTotal / 400.0) * 100.0;

        if (this.percentage >= 85) this.grade = "AA";
        else if (this.percentage >= 75) this.grade = "AB";
        else if (this.percentage >= 65) this.grade = "BB";
        else if (this.percentage >= 55) this.grade = "BC";
        else if (this.percentage >= 40) this.grade = "CC";
        else this.grade = "FF";

        this.status = this.percentage >= 40 ? "PASS" : "FAIL";
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getPrn() { return prn; }
    public void setPrn(String prn) { this.prn = prn; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getBranch() { return branch; }
    public void setBranch(String branch) { this.branch = branch; }
    public Integer getSemester() { return semester; }
    public void setSemester(Integer semester) { this.semester = semester; }
    public Double getMseSub1() { return mseSub1; }
    public void setMseSub1(Double mseSub1) { this.mseSub1 = mseSub1; }
    public Double getEseSub1() { return eseSub1; }
    public void setEseSub1(Double eseSub1) { this.eseSub1 = eseSub1; }
    public Double getTotalSub1() { return totalSub1; }
    public void setTotalSub1(Double totalSub1) { this.totalSub1 = totalSub1; }
    public Double getMseSub2() { return mseSub2; }
    public void setMseSub2(Double mseSub2) { this.mseSub2 = mseSub2; }
    public Double getEseSub2() { return eseSub2; }
    public void setEseSub2(Double eseSub2) { this.eseSub2 = eseSub2; }
    public Double getTotalSub2() { return totalSub2; }
    public void setTotalSub2(Double totalSub2) { this.totalSub2 = totalSub2; }
    public Double getMseSub3() { return mseSub3; }
    public void setMseSub3(Double mseSub3) { this.mseSub3 = mseSub3; }
    public Double getEseSub3() { return eseSub3; }
    public void setEseSub3(Double eseSub3) { this.eseSub3 = eseSub3; }
    public Double getTotalSub3() { return totalSub3; }
    public void setTotalSub3(Double totalSub3) { this.totalSub3 = totalSub3; }
    public Double getMseSub4() { return mseSub4; }
    public void setMseSub4(Double mseSub4) { this.mseSub4 = mseSub4; }
    public Double getEseSub4() { return eseSub4; }
    public void setEseSub4(Double eseSub4) { this.eseSub4 = eseSub4; }
    public Double getTotalSub4() { return totalSub4; }
    public void setTotalSub4(Double totalSub4) { this.totalSub4 = totalSub4; }
    public Double getGrandTotal() { return grandTotal; }
    public void setGrandTotal(Double grandTotal) { this.grandTotal = grandTotal; }
    public Double getPercentage() { return percentage; }
    public void setPercentage(Double percentage) { this.percentage = percentage; }
    public String getGrade() { return grade; }
    public void setGrade(String grade) { this.grade = grade; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}