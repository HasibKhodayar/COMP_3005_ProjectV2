package com.example.HealthFitnessClubManagement.repository;

import com.example.HealthFitnessClubManagement.model.Billing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BillingRepository extends JpaRepository<Billing, Long> {

    @Query("SELECT b FROM Billing b")
    List<Billing> getAllBilling();

    @Query("SELECT b FROM Billing b WHERE b.member.memberID =:memberId")
    List<Billing> getBillsByMember(Long memberId);
}


