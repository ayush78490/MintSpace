; ModuleID = 'autocfg_99f595a319c1df4b_2.bd7153254ea1db3-cgu.0'
source_filename = "autocfg_99f595a319c1df4b_2.bd7153254ea1db3-cgu.0"
target datalayout = "e-m:e-p270:32:32-p271:32:32-p272:64:64-i64:64-i128:128-f80:128-n8:16:32:64-S128"
target triple = "x86_64-pc-linux-gnu"

; autocfg_99f595a319c1df4b_2::probe
; Function Attrs: nonlazybind uwtable
define void @_ZN26autocfg_99f595a319c1df4b_25probe17hb6c4bb66c4f895dbE() unnamed_addr #0 {
start:
  %0 = alloca [4 x i8], align 4
  store i32 -2147483648, ptr %0, align 4
  %_0.i = load i32, ptr %0, align 4
  ret void
}

; Function Attrs: nocallback nofree nosync nounwind speculatable willreturn memory(none)
declare i32 @llvm.bitreverse.i32(i32) #1

attributes #0 = { nonlazybind uwtable "probe-stack"="inline-asm" "target-cpu"="x86-64" }
attributes #1 = { nocallback nofree nosync nounwind speculatable willreturn memory(none) }

!llvm.module.flags = !{!0, !1}
!llvm.ident = !{!2}

!0 = !{i32 8, !"PIC Level", i32 2}
!1 = !{i32 2, !"RtLibUseGOT", i32 1}
!2 = !{!"rustc version 1.85.0 (4d91de4e4 2025-02-17) (Arch Linux rust 1:1.85.0-1)"}
